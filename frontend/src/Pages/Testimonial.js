import React, { useState, useEffect } from "react";
import "../Styles/Testimonial.css";
import QuoteIcon from "../assets/quote.png";
import axios from "axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => {
        setTestimonials(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="testimonial-loading">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="testimonial-error">{error}</div>;
  }

  if (testimonials.length === 0) {
    return <div className="testimonial-empty">No testimonials available.</div>;
  }

  const totalTestimonials = testimonials.length;

  const goToPreviousTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalTestimonials - 1 : prev - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === totalTestimonials - 1 ? 0 : prev + 1
    );
  };

  const { name, position, message, video } = testimonials[currentIndex];

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">Clients Testimonials</h2>
      <div className="testimonial-container">
        {/* Video */}
        <div className="testimonial-video-container">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="testimonial-video"
          />
        </div>

        {/* Text */}
        <div className="testimonial-text">
          <img src={QuoteIcon} alt="Quote" className="quote-icon" />
          <p className="testimonial-message">{message}</p>
          <h3 className="client-name">{name}</h3>
          <p className="client-position">{position}</p>

          <div className="testimonial-nav">
            <span className="arrow left" onClick={goToPreviousTestimonial}>←</span>
            <span className="arrow right" onClick={goToNextTestimonial}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
