// src/admin/components/Sidebar.js

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Styles/admin/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    // Auto-close sidebar when a link is clicked (mobile only)
    if (window.innerWidth <= 768) setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button (mobile only) */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <img src="/assets/Logo.png" alt="RTech Logo" />
          <span>RTech Admin</span>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={isActive("/admin/dashboard") ? "active" : ""}
            onClick={handleLinkClick}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={isActive("/admin/products") ? "active" : ""}
            onClick={handleLinkClick}
          >
            <i className="fas fa-box-open"></i> Products
          </Link>

          <Link
            to="/admin/services"
            className={isActive("/admin/services") ? "active" : ""}
            onClick={handleLinkClick}
          >
            <i className="fas fa-cogs"></i> Services
          </Link>

          <Link
            to="/admin/testimonials"
            className={isActive("/admin/testimonials") ? "active" : ""}
            onClick={handleLinkClick}
          >
            <i className="fas fa-comment-dots"></i> Testimonials
          </Link>
        </nav>
      </aside>

      {/* Dark overlay (mobile only) */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
