// controllers/contactController.js
const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");

// ✅ Setup transporter for Namecheap Private Email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // mail.privateemail.com
  port: process.env.SMTP_PORT, // 587
  secure: false, // false for 587, true for 465
  auth: {
    user: process.env.ADMIN_EMAIL,       // amin@rtecsolutionspvtltd.com
    pass: process.env.ADMIN_EMAIL_PASSWORD // your mailbox password
  },
  tls: {
    rejectUnauthorized: false // avoid TLS self-signed issues
  }
});

const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // ✅ Save to database
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // ✅ 1. Send email to Admin
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_RECEIVER_EMAIL,
      subject: `New Contact Form Submission: ${subject || "No subject"}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // ✅ 2. Auto-reply to User
    await transporter.sendMail({
      from: `"R Tech Solutions" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: `We have received your query${subject ? `: ${subject}` : ""}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting us. We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>Our team will review your query and get back to you within 24-48 hours.</p>
        <p>If your inquiry is product-related, you may also call us at <strong>+91-73396 63777</strong>.</p>
        <p>Best regards,</p>
        <p><strong>R Tech Solutions</strong><br>
        📧 ${process.env.ADMIN_EMAIL}<br>
        📞 +91-73396 63777</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Message submitted and emails sent successfully",
      contact: newContact
    });

  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { createContact };
