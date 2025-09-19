import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../assets/Logo.png";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get("https://rtecsolutionspvtltd.com/api//services");
        setServices(servicesRes.data);

        const productsRes = await axios.get("https://rtecsolutionspvtltd.com/api//products");
        const grouped = productsRes.data.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Failed to fetch navbar data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setActiveCategory(null);
  };

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
    setActiveCategory(null);
  };

  const toggleCategory = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const scrollToSection = (id) => {
    const scroll = () => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    };
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      setTimeout(scroll, 200);
    } else {
      scroll();
    }
  };

  return (
    <header className="navbar glassy-navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Rtec Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>

        {/* Services */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${activeDropdown === "services" ? "active" : ""}`}
            onClick={() => toggleDropdown("services")}
          >
            Services {activeDropdown === "services" ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </button>
          <div className={`dropdown-content ${activeDropdown === "services" ? "show" : ""}`}>
            {services.map((service) => (
              <Link key={service._id} to={`/services/${service.slug}`} onClick={closeMenu}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${activeDropdown === "products" ? "active" : ""}`}
            onClick={() => toggleDropdown("products")}
          >
            Products {activeDropdown === "products" ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </button>

          <div className={`dropdown-content products-scroll ${activeDropdown === "products" ? "show" : ""}`}>
            {Object.keys(groupedProducts).map((category) => (
              <div className="nested-dropdown" key={category}>
                <button
                  className={`nested-btn ${activeCategory === category ? "active" : ""}`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                  {activeCategory === category ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                <div className={`nested-content ${activeCategory === category ? "show" : ""}`}>
                  {groupedProducts[category].map((product) => (
                    <Link key={product._id} to={`/products/${product.slug}`} onClick={closeMenu}>
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="scroll-link" onClick={() => scrollToSection("about-section")}>
          About Us
        </button>

        <button className="scroll-link nav-link-btn" onClick={() => scrollToSection("contact-section")}>
          Contact Us
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
