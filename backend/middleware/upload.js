const multer = require("multer");
const {
  productStorage,
  serviceStorage,
  testimonialStorage, // make sure you export this from config/cloudinary.js
} = require("../config/cloudinary");

const uploadProduct = multer({ storage: productStorage });
const uploadService = multer({ storage: serviceStorage });
const uploadTestimonial = multer({ storage: testimonialStorage });

module.exports = { uploadProduct, uploadService, uploadTestimonial };
