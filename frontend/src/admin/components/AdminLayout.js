// src/admin/components/AdminLayout.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <main
        className="admin-main"
        style={{
          marginLeft: isMobile ? "0" : "220px",
          padding: "80px 30px 30px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
