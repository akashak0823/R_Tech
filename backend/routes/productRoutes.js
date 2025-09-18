const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { uploadProduct } = require("../middleware/upload");
const slugify = require("slugify");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("Returning products:", products.length);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET product by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create product with image upload
router.post("/", uploadProduct.array("images", 5), async (req, res) => {
  try {
    const { name, description, details, category, tags, related } = req.body;

    const images = req.files?.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags || [];
    const parsedRelated = typeof related === "string" ? JSON.parse(related) : related || [];

    const newProduct = new Product({
      name,
      slug: slugify(name || "", { lower: true }),
      description,
      details,
      images,
      category,
      tags: parsedTags,
      related: parsedRelated,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Product creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update product with new images (optional)
router.put("/:id", uploadProduct.array("images", 5), async (req, res) => {
  try {
    console.log("Updating product with ID:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Files:", req.files);

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, details, category, tags, related } = req.body;

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        public_id: file.filename,
        url: file.path,
      }));
      product.images = images;
      console.log("Updated images:", images);
    }

    if (name) {
      product.name = name;
      product.slug = slugify(name, { lower: true });
    }

    product.description = description || product.description;
    product.details = details || product.details;
    product.category = category || product.category;

    product.tags =
      typeof tags === "string" ? JSON.parse(tags) : tags || product.tags;

    product.related =
      typeof related === "string" ? JSON.parse(related) : related || product.related;

    const updated = await product.save();
    console.log("Updated product:", updated);
    res.json(updated);
  } catch (err) {
    console.error("Product update failed:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
