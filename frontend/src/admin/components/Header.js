// src/admin/components/Header.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/admin/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <h3>Admin Panel</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
