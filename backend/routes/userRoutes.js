// Example: routes/userRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users endpoint works");
});

module.exports = router;
