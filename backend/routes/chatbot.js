// backend/routes/chatbot.js
require("dotenv").config();
const express = require("express");
const Fuse = require("fuse.js");
const OpenAI = require("openai");

const router = express.Router();

const Service = require("../models/Service");
const Product = require("../models/Product");
const Testimonial = require("../models/Testimonial");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Static company info
const companyInfo = {
  name: "Rtec Solutions Pvt Ltd",
  about: `Rtec Solutions Pvt Ltd is your trusted industrial product solution partner. 
We specialize in marketing solutions for manufacturing companies and industries, integrating high-quality industrial hardware, 
filtration systems, precision auto components, and custom sensor software solutions. 
Our expertise bridges the gap between industrial supply and smart technology by delivering reliable sourcing and sensor-based 
automation software to industries such as automotive, construction, manufacturing, and engineering services.`,
  contact: {
    phone: "+91 73396 63777",
    email: "rtecsolutionss@gmail.com",
    location: "Tamil Nadu, India"
  }
};

function paginate(array, page = 1, limit = 5) {
  const start = (page - 1) * limit;
  return array.slice(start, start + limit);
}

router.post("/", async (req, res) => {
  try {
    let { query, page = 1, limit = 5 } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    page = Number(page);
    limit = Number(limit);

    const q = query.toLowerCase();
    let matchedData = [];

    // --- CONTEXT MEMORY ---
    if ((q.includes("tell me more") || q.includes("more details")) && req.session.lastResults) {
      const data = paginate(req.session.lastResults, page, limit);
      return res.json({
        type: req.session.lastType,
        answer: data,
        total: req.session.lastResults.length,
        page,
        limit
      });
    }

    // --- COMPANY INFO ---
    if (q.includes("about") || q.includes("company")) {
      matchedData.push({ type: "about", data: companyInfo.about });
    }

    // --- CONTACT INFO ---
    if (q.includes("contact") || q.includes("phone") || q.includes("email")) {
      matchedData.push({ type: "contact", data: companyInfo.contact });
    }

    // --- FETCH SERVICES & PRODUCTS ---
    const allServices = await Service.find();
    const allProducts = await Product.find();
    const serviceFuse = new Fuse(allServices, { keys: ["title", "description"], threshold: 0.4 });
    const productFuse = new Fuse(allProducts, { keys: ["name", "description", "category"], threshold: 0.4 });

    // --- LIST ALL SERVICES ---
    if (q.includes("services") || q.includes("offerings")) {
      const results = allServices.map(s => ({
        title: s.title,
        description: s.description,
        link: `/services/${s.slug || s._id}`
      }));
      req.session.lastResults = results;
      req.session.lastType = "services";
      matchedData.push({ type: "services", data: paginate(results, page, limit) });
    }

    // --- LIST ALL PRODUCTS ---
    if (q.includes("products") || q.includes("items") || q.includes("catalogue")) {
      const results = allProducts.map(p => ({
        name: p.name,
        category: p.category,
        description: p.description,
        image: p.images?.[0]?.url || null,
        link: `/products/${p.slug || p._id}`
      }));
      req.session.lastResults = results;
      req.session.lastType = "products";
      matchedData.push({ type: "products", data: paginate(results, page, limit) });
    }

    // --- FUZZY MATCH SERVICE ---
    const serviceMatch = serviceFuse.search(query)[0];
    if (serviceMatch) {
      const service = serviceMatch.item;
      service.link = `/services/${service.slug || service._id}`;
      matchedData.push({ type: "service", data: service });
    }

    // --- FUZZY MATCH PRODUCT ---
    const productMatch = productFuse.search(query)[0];
    if (productMatch) {
      const product = productMatch.item;
      product.link = `/products/${product.slug || product._id}`;
      matchedData.push({ type: "product", data: product });
    }

    // --- TESTIMONIALS ---
    if (q.includes("testimonial") || q.includes("review")) {
      const testimonials = await Testimonial.find();
      matchedData.push({ type: "testimonials", data: testimonials });
    }

    // --- NO MATCH ---
    if (matchedData.length === 0) {
      return res.json({
        type: "unknown",
        answer: "I couldn't find that information. Please try asking about a product, service, or company info."
      });
    }

    // --- AI RESPONSE ---
    const aiPrompt = `
You are Rtec Solutions' virtual assistant.
Only use the provided company data to answer the user's question.
If the answer is not found, reply exactly: "I couldn't find that information in our records."

IMPORTANT: When mentioning products or services, use the provided links (e.g., "View Product" or "View Service") instead of raw URLs.
For images, use the image URLs from the data, but for navigation, use the proper links.

User Question: ${query}

Company Data:
${JSON.stringify(matchedData, null, 2)}
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Only use the provided company data to answer. Do not make up information." },
        { role: "user", content: aiPrompt }
      ],
      temperature: 0
    });

    res.json({
      type: "ai",
      answer: aiResponse.choices[0].message.content,
      data: matchedData,
      // Include structured data for better frontend handling
      structuredData: matchedData
    });

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
