const express = require("express");
const router = express.Router();
const { uploadService } = require("../middleware/upload");

const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/servicesController");

// Middleware to set cloudinary folder for services
const setCloudinaryFolder = (req, res, next) => {
  req.cloudinaryFolder = "R_tech/Services";
  next();
};

// Create Service with media and icon upload (multiple files)
router.post(
  "/",
  setCloudinaryFolder,
  uploadService.fields([
    { name: "media", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  createService
);

// Get all services
router.get("/", getAllServices);

// Get a single service by ID
router.get("/:id", getServiceById);

// Update service with media and icon upload (multiple files)
router.put(
  "/:id",
  setCloudinaryFolder,
  uploadService.fields([
    { name: "media", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  updateService
);

// Delete service
router.delete("/:id", deleteService);

module.exports = router;
