// routes/someRoute.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from API");
});

module.exports = router; // ✅ MUST export a router function
