import React, { useEffect, useState } from "react";
import "../Styles/Footer.css";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import axios from "axios";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get("https://www.rtecsolutionspvtltd.com/api/services");
        setServices(servicesRes.data);

        const productsRes = await axios.get("https://www.rtecsolutionspvtltd.com/api/products");
        const grouped = productsRes.data.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Column 1: Brand Info */}
        <div className="footer-section">
          <img src={Logo} alt="Rtec Solutions Logo" className="footer-logo" />
          <p>
            Rtec Solutions Pvt Ltd is your trusted partner in industrial solutions — delivering
            precision components, filtration systems, and IoT-enabled smart technologies.
          </p>
          <div className="footer-contact">
            <p><a href="mailto:rtecsolutionss@gmail.com">rtecsolutionss@gmail.com</a></p>
            <p><a href="tel:+917339663777">+91 73396 63777</a></p>
            <p>Tamil Nadu, India</p>
          </div>
        </div>

        {/* Column 2: Products */}
        <div className="footer-section">
          <h4 className="footer-title">Products</h4>
          <ul>
            {Object.keys(groupedProducts).map((category, idx) => (
              <li
                key={idx}
                onClick={() =>
                  handleRedirect(`/products/${groupedProducts[category][0].slug}`)
                }
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-section">
          <h4 className="footer-title">Services</h4>
          <ul>
            {services.map((service) => (
              <li
                key={service._id}
                onClick={() => handleRedirect(`/services/${service.slug}`)}
              >
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Company & Legal */}
        <div className="footer-section">
          

          <h4 className="footer-title">Legal</h4>
          <ul>
            <li onClick={() => handleRedirect("/terms")}>Terms & Conditions</li>
            <li onClick={() => handleRedirect("/privacy")}>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 5: Social */}
        <div className="footer-section">
          <h4 className="footer-title">Connect</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/rtec-solution-pvt-ltd/"target="_blank"
      rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="#"><FaTwitter /></a>
          </div>
          <p className="footer-note">
            Follow us to stay updated with our latest innovations.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rtec Solutions Pvt Ltd. All Rights Reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
