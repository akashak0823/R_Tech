const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const nodemailer = require("nodemailer");

// === REGISTER (Only once by you or by superadmin) ===
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await Admin.findOne({ $or: [{ username }, { email }] });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, email, password: hashed });
  await admin.save();

  res.json({ message: "Admin registered" });
});

// === LOGIN ===
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { username: admin.username, isAdmin: true },
    process.env.JWT_SECRET || "SuperSecretJWTKey!123",
    { expiresIn: "2h" }
  );

  res.json({ token });
});

// === RESET PASSWORD ===
// === RESET PASSWORD ===
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // 1️⃣ Validate newPassword
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // 2️⃣ Find admin with valid token
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3️⃣ Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    // 4️⃣ Clear reset token and expiry
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;

    await admin.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});


// === FORGOT PASSWORD ===
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Email not found" });

  const token = crypto.randomBytes(32).toString("hex");
  admin.resetToken = token;
  admin.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await admin.save();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: (process.env.SMTP_SECURE === "true"), // false for STARTTLS (587)
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      // use tls.rejectUnauthorized false if your provider needs it in dev
      tls: { rejectUnauthorized: false },
    });

    // Optional: verify SMTP connection early and log helpful info
    await transporter.verify();
    console.log("✅ SMTP verified");

    const resetLink = `${process.env.FRONTEND_URL}/admin/reset-password/${token}`;

    const mailOptions = {
      from: `"RTech Solutions" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "RTech - Reset your password",
      text: `Hello ${admin.username},

You requested a password reset. Click the link below to reset your password:
${resetLink}

This link is valid for 1 hour.

If you didn't request this, ignore this email.`,
      html: `
        <p>Hello ${admin.username},</p>
        <p>Click the button below to reset your password (expires in 1 hour):</p>
        <p><a href="${resetLink}" style="padding:10px 14px; background:#D84040; color:#fff; text-decoration:none; border-radius:6px;">Reset Password</a></p>
        <p>If you did not request this, ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✉️ Reset email sent:", info.messageId);

    return res.json({ message: "Reset link sent to your email." });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ message: "Failed to send reset email. Try again later." });
  }
});

// ✅ export router
module.exports = router;
