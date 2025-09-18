const express = require("express");
const router = express.Router();
const { uploadProduct, uploadService } = require("../middleware/upload");

// Product upload route (single file with field name "image")
router.post("/upload-product", uploadProduct.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: req.file.path });
});

// Service upload route (multiple files: "media" and "icon")
router.post(
  "/upload-service",
  uploadService.fields([
    { name: "media", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  (req, res) => {
    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const mediaUrl = req.files.media && req.files.media[0] ? req.files.media[0].path : null;
    const iconUrl = req.files.icon && req.files.icon[0] ? req.files.icon[0].path : null;

    res.json({ mediaUrl, iconUrl });
  }
);

module.exports = router;
