const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    keyFeatures: { type: [String], default: [] },
    category: { type: String, default: "" },
    icon: { type: String, default: "" }, // URL string for icon image (optional)
    slug: { type: String, unique: true, lowercase: true, trim: true, required: true },
    media: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
      resource_type: { type: String, enum: ["image", "video"], default: "image" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
