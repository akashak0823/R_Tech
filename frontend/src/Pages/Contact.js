import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Styles/Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post("http://31.97.60.209:5000/api/contact", formData);
      setStatusMessage("✅ Thank you! We will contact you soon.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <motion.h2
          className="gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch With Us
        </motion.h2>

        <div className="contact-grid">
          {/* Left: Form */}
          <motion.form
            className="contact-form premium-card"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Write a message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <motion.button
              type="submit"
              className="send-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </motion.button>

            {statusMessage && (
              <p
                style={{
                  marginTop: "10px",
                  color: statusMessage.startsWith("✅") ? "green" : "red",
                }}
              >
                {statusMessage}
              </p>
            )}
          </motion.form>

          {/* Right: Map & Contact Info */}
          <motion.div
            className="contact-info premium-card"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="gradient-text">RTEC SOLUTION PVT LTD</h4>
            <p className="office-address">
              NO 42 - D2 COSMAFAN BUILDING, <br />
              NAVA INDIA ROAD, PEELAMEDU, <br />
              COIMBATORE 641004
            </p>

            <div className="direct-details">
              <p>
                Email:{" "}
                <a href="mailto:rtecsolutionss@gmail.com">
                  rtecsolutionss@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+917339663777">+91 73396 63777</a>
              </p>
            </div>

            {/* Google Maps Embed */}
            <motion.iframe
              title="Google Map"
              className="map-frame"
              src="https://www.google.com/maps?q=NO+42+D2+COSMAFAN+BUILDING+NAVA+INDIA+ROAD+PEELAMEDU+COIMBATORE+641004&output=embed"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.iframe>

            {/* Contact Now Button */}
            <motion.button
              className="call-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "tel:+917339663777")}
            >
              Contact Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
