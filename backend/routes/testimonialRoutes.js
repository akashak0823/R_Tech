const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { uploadTestimonial } = require("../middleware/upload");

// GET all testimonials
router.get("/", getTestimonials);

// GET single testimonial by ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (err) {
    console.error("Error fetching testimonial by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD new testimonial (single file field name: "video")
router.post("/", uploadTestimonial.single("video"), addTestimonial);

// UPDATE testimonial by ID (single file field name: "video")
router.put("/:id", uploadTestimonial.single("video"), updateTestimonial);

// DELETE testimonial by ID
router.delete("/:id", deleteTestimonial);

module.exports = router;
