const Service = require("../models/Service");
const slugify = require("slugify");

// Create Service with media (image/video) and icon
exports.createService = async (req, res) => {
  try {
    const { title, description, keyFeatures, category } = req.body;

    const newService = new Service({
      title,
      description,
      keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : [],
      category,
      slug: slugify(title, { lower: true }),
    });

    // Handle media file (image/video)
    if (req.files?.media && req.files.media.length > 0) {
      const mediaFile = req.files.media[0];
      newService.media = {
        url: mediaFile.path, // Cloudinary URL from multer-storage-cloudinary
        resource_type: mediaFile.mimetype.startsWith("video") ? "video" : "image",
      };
    }

    // Handle icon file
    if (req.files?.icon && req.files.icon.length > 0) {
      const iconFile = req.files.icon[0];
      newService.icon = iconFile.path; // Cloudinary URL
    }

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update service with optional media and icon update
exports.updateService = async (req, res) => {
  try {
    const { title, description, keyFeatures, category } = req.body;

    const updatedData = {
      title,
      description,
      keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : [],
      category,
      slug: slugify(title, { lower: true }),
    };

    // Update media file if new file uploaded
    if (req.files?.media && req.files.media.length > 0) {
      const mediaFile = req.files.media[0];
      updatedData.media = {
        url: mediaFile.path,
        resource_type: mediaFile.mimetype.startsWith("video") ? "video" : "image",
      };
    }

    // Update icon file if new file uploaded
    if (req.files?.icon && req.files.icon.length > 0) {
      const iconFile = req.files.icon[0];
      updatedData.icon = iconFile.path;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
