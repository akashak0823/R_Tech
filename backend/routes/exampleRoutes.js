// routes/exampleRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API route is working ✅" });
});

module.exports = router;
