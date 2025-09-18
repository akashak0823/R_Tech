const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String, required: true },
  video: { type: String, required: true } // video URL or Cloudinary link
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);
