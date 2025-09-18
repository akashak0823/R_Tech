import React from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/Home.css';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import heroImage from '../assets/hero-chip2.png';
import Services from './Services';
import GlowingCircuit from '../Components/GlowingCircuit';
import Products from './Products';
import About from './About';
import Testimonial from './Testimonial';
import Contact from './Contact';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Home = () => {
  const navigate = useNavigate();

  // ✅ Function to scroll to Contact section
  const scrollToContact = () => {
    const contactSection = document.querySelector('.contact-container');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ✅ Function to navigate to Products page
  const goToProducts = () => {
    navigate('/products');
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <GlowingCircuit />

        {/* Hero Section */}
        <motion.section
          className="hero-section"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
        >
          <motion.div className="hero-text" variants={fadeIn}>
            <motion.h1 className="glow-heading" variants={fadeIn}>
              <motion.span className="glow-word red">
                Rtec Solutions Pvt. Ltd. is
              </motion.span>{' '}
              <motion.span className="glow-word">
                your trusted Industrial Solution
              </motion.span>{' '}
              <motion.span className="glow-word red">
                Partner
              </motion.span>
            </motion.h1>

            <motion.p variants={fadeIn}>
              Delivering high-quality industrial hardware, filtration systems, precision
              auto components, and smart sensor solutions for modern automation needs. 
              We bridge traditional industries with smart IIoT technologies, helping
              manufacturers increase efficiency, reduce downtime, and achieve 
              innovation-driven growth. Our expertise spans Industrial Hardware & 
              Fasteners (Hex Bolts, Nuts, Washers), Filtration & Process Equipment 
              (Filter Bags, Cages, Strainers), Auto Components & Precision Parts 
              (CNC Shafts, Yokes, Bushings), and Smart Sensor Solutions for 
              industrial automation.
            </motion.p>

            <motion.div className="hero-cta-buttons" variants={fadeIn}>
              <div className="hero-buttons">
                <button className="primary-btn" onClick={goToProducts}>
                  Explore Products
                </button>
                <button className="outline-btn" onClick={scrollToContact}>
                  Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>

          <Tilt
            glareEnable
            glareColor="rgba(255,255,255,0.5)" 
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.05}
            transitionSpeed={1000}
            className="hero-image"
          >
            <motion.img
              src={heroImage}
              alt="Smart IoT Chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            />
          </Tilt>
        </motion.section>

        <Services />
      </div>

      <Products />
      <section id="about-section">
        <About />
      </section>
      <Testimonial />
      <section id="contact-section">
        <Contact />
      </section>
      <Footer />
     
    </>
  );
};

export default Home;
