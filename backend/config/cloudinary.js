const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for Products (Images only)
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Rtec/Products",
    allowedFormats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image", // strictly images
  },
});

// Storage for Services (Images + Videos)
const serviceStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Rtec/Services",
    allowedFormats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi", "mkv", "webm"],
    resource_type: "auto", // auto handles both images and videos
  },
});

module.exports = { cloudinary, productStorage, serviceStorage };
 
// Add dedicated storage for Testimonial videos (and allow images if needed)
const testimonialStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Rtec/Testimonials",
    allowedFormats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "mp4",
      "mov",
      "avi",
      "mkv",
      "webm",
    ],
    // Use auto to support both images and videos in case some testimonials use image thumbnails
    resource_type: "auto",
  },
});

module.exports.testimonialStorage = testimonialStorage;