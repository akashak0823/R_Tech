const nodemailer = require("nodemailer");
require("dotenv").config();

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.privateemail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // false for 587
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false }, // helps in dev
    });

    // Verify connection
    await transporter.verify();
    console.log("✅ SMTP connection successful");

    // Send a test mail
    const info = await transporter.sendMail({
      from: `"RTech Test" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_RECEIVER_EMAIL || "rtecsolutionss@gmail.com",
      subject: "SMTP Test ✔",
      text: "This is a test email from RTech backend setup.",
    });

    console.log("✉️ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ SMTP Test Failed:", err);
  }
}

testSMTP();
