import React, { useState } from "react";
import { motion } from "framer-motion";
import aboutData from "../utils/AboutData";
import "../Styles/About.css";

const About = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const parallax = (speed) => ({
    x: (cursorPos.x / window.innerWidth - 0.5) * speed,
    y: (cursorPos.y / window.innerHeight - 0.5) * speed,
  });

  return (
    <div
      className="about-container premium-layout"
      onMouseMove={handleMouseMove}
      style={{
        "--cursorX": `${cursorPos.x}px`,
        "--cursorY": `${cursorPos.y}px`,
      }}
    >
      {/* Title */}
      <motion.h2
        className="about-title animated-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Us
      </motion.h2>

      {/* Sub Heading (optional for professionalism) */}
      <motion.p
        className="about-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Driving innovation with passion, precision, and purpose.
      </motion.p>

      {/* About Cards */}
      <div className="about-cards stagger-layout">
        {aboutData.map((card, index) => (
          <motion.div
            key={index}
            className="about-card floating-card"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
            whileHover={{
              scale: 1.1,
              rotateX: 10,
              rotateY: -10,
            }}
            style={{
              transform: `translate(${parallax(index % 2 === 0 ? 20 : -20).x}px, 
                          ${parallax(index % 2 === 0 ? 20 : -20).y}px)`,
            }}
          >
            <motion.video
              src={card.video}
              autoPlay
              loop
              muted
              playsInline
              className="about-video floating-icon"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <h3 className="about-card-title">{card.title}</h3>
            <p className="about-card-text">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
