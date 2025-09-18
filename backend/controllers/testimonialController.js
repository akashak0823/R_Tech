const Testimonial = require("../models/Testimonial");

// GET all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).json({ error: "Server error while fetching testimonials." });
  }
};

// ADD testimonial
const addTestimonial = async (req, res) => {
  try {
    const { name, position, message } = req.body;
    const uploadedVideoUrl = req.file ? req.file.path : null;
    const providedVideoUrl = req.body.video || req.body.oldVideo || null;
    const video = uploadedVideoUrl || providedVideoUrl;

    if (!name || !position || !message || !video) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const testimonial = new Testimonial({ name, position, message, video });
    await testimonial.save();

    res.status(201).json(testimonial);
  } catch (err) {
    console.error("Error adding testimonial:", err);
    res.status(500).json({ error: "Failed to add testimonial." });
  }
};

// UPDATE testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, message } = req.body;

    const updates = { name, position, message };
    if (req.file && req.file.path) {
      updates.video = req.file.path;
    } else if (req.body.oldVideo) {
      updates.video = req.body.oldVideo;
    } else if (typeof req.body.video === "string" && req.body.video.trim() !== "") {
      updates.video = req.body.video;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Testimonial not found." });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating testimonial:", err);
    res.status(500).json({ error: "Failed to update testimonial." });
  }
};

// DELETE testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Testimonial not found." });
    }

    res.status(200).json({ message: "Testimonial deleted successfully." });
  } catch (err) {
    console.error("Error deleting testimonial:", err);
    res.status(500).json({ error: "Failed to delete testimonial." });
  }
};

module.exports = {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial
};
