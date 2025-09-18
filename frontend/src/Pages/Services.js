import React, { useEffect, useRef, useState } from "react";
import "../Styles/Services.css";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { fetchServices } from "../api";

gsap.registerPlugin(ScrollTrigger);

const ServiceMedia = ({ media, icon }) => {
  if (!media || !media.url) {
    // fallback: if you want, show icon text or placeholder
    return <div style={{ width: 60, height: 60, lineHeight: "60px", textAlign: "center", fontWeight: "bold", color: "#888" }}>{icon || "N/A"}</div>;
  }

  if (media.resource_type === "video") {
    return (
      <video
        src={media.url}
        style={{ width: 60, height: 60, objectFit: "contain" }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    );
  }

  // fallback to image
  return (
    <img
      src={media.url}
      alt="service media"
      style={{ width: 60, height: 60, objectFit: "contain" }}
    />
  );
};

const Services = () => {
  const cardsRef = useRef([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetchServices();
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    getServices();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      }
    });
  }, [services]);

  return (
    <section className="services-section">
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h4>What We Offer</h4>
        <h2 className="gradient-text">Our Services</h2>
        <p className="services-subtitle">
          Rtec blends industrial expertise with smart technology to power modern manufacturing.
        </p>
      </motion.div>

      <div className="services-grid">
        {services.map((service, idx) => (
          <motion.div
            key={service._id}
            className="service-card"
            ref={(el) => (cardsRef.current[idx] = el)}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0px 18px 28px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 170, damping: 16 }}
          >
            <div className="service-icon">
              <ServiceMedia media={service.media} icon={service.icon} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <Link to={`/services/${service.slug}`} className="learn-more-btn">
              <button className="learn-more-button">Learn more →</button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
