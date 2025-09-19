// backend/controllers/chatbotController.js
const axios = require("axios");

exports.handleChat = async (req, res) => {
  const { message } = req.body;
  let responseText = "";

  try {
    if (/service/i.test(message)) {
      const { data } = await axios.get("https://rtecsolutionspvtltd.com/api//chatbot/services");
      responseText = "Here are our services:\n" + data.map(s => `- ${s.title}`).join("\n");
    }
    else if (/product/i.test(message)) {
      const { data } = await axios.get("https://rtecsolutionspvtltd.com/api//chatbot/products");
      responseText = "Our products include:\n" + data.map(p => `- ${p.name}`).join("\n");
    }
    else if (/about|company/i.test(message)) {
      const { data } = await axios.get("https://rtecsolutionspvtltd.com/api//chatbot/company");
      responseText = data?.description || "No company details available.";
    }
    else if (/testimonial/i.test(message)) {
      const { data } = await axios.get("https://rtecsolutionspvtltd.com/api//chatbot/testimonials");
      responseText = "Here's what our clients say:\n" + data.map(t => `- "${t.message}"`).join("\n");
    }
    else {
      responseText = "I can help you with our services, products, company info, or testimonials. What would you like to know?";
    }

    res.json({ reply: responseText });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chatbot data." });
  }
};
