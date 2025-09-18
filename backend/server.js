// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
  secret: "rtec_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 10 }, // 10 min session
  name: 'rtec_session'
}));

// Debug middleware to log session info
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Session middleware check:', {
    hasSession: !!req.session,
    sessionID: req.sessionID,
    sessionKeys: req.session ? Object.keys(req.session) : 'No session'
  });
  next();
});

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/chatbot", require("./routes/chatbot")); 


const adminRoutes = require("./routes/adminAuth");
console.log("✅ adminAuth routes loaded");  // Add this
app.use("/api/admin", adminRoutes);

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler (must have 4 parameters to catch errors)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  console.error("Error stack:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to DB, then start server
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("📝 Session middleware configured");
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  }
})();
