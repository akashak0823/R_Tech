import React, { useEffect, useState } from "react";
import "../Styles/admin/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaCogs, FaUsers, FaSignOutAlt, FaStar } from "react-icons/fa";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, servicesRes, usersRes, testimonialsRes] = await Promise.all([
        axios.get("https://rtecsolutionspvtltd.com/api//products"),
        axios.get("https://rtecsolutionspvtltd.com/api//services"),
        axios.get("https://rtecsolutionspvtltd.com/api//users"),
        axios.get("https://rtecsolutionspvtltd.com/api//testimonials"),
      ]);

      setProducts(productsRes.data);
      setServices(servicesRes.data);
      setUsersCount(usersRes.data.length);
      setTestimonialsCount(testimonialsRes.data.length);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const stats = [
    {
      title: "Total Products",
      count: products.length,
      color: "#007bff",
      icon: <FaBoxOpen />,
      route: "/admin/products",
    },
    {
      title: "Total Services",
      count: services.length,
      color: "#28a745",
      icon: <FaCogs />,
      route: "/admin/services",
    },
    {
      title: "Total Users",
      count: usersCount,
      color: "#ffc107",
      icon: <FaUsers />,
      route: "/admin/users",
    },
    {
      title: "Testimonials",
      count: testimonialsCount,
      color: "#6f42c1",
      icon: <FaStar />,
      route: "/admin/testimonials",
    },
  ];

  // === Grouping logic ===
  const groupByCategory = (items) => {
    const groups = {};
    items.forEach((item) => {
      const cat = item.category || "Uncategorized";
      groups[cat] = (groups[cat] || 0) + 1;
    });
    return groups;
  };

  const productCategoryCounts = groupByCategory(products);
  const serviceCategoryCounts = groupByCategory(services);

  const productPieData = {
    labels: Object.keys(productCategoryCounts),
    datasets: [
      {
        data: Object.values(productCategoryCounts),
        backgroundColor: ["#007bff", "#17a2b8", "#6610f2", "#6f42c1", "#fd7e14", "#20c997"],
      },
    ],
  };

  const servicePieData = {
    labels: Object.keys(serviceCategoryCounts),
    datasets: [
      {
        data: Object.values(serviceCategoryCounts),
        backgroundColor: ["#28a745", "#ffc107", "#dc3545", "#6c757d", "#17a2b8", "#6610f2"],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Top Bar */}
      <div className="dashboard-topbar">
        <h2>Dashboard Overview</h2>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Stat Cards */}
      <div className="dashboard-cards">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            style={{ borderLeftColor: item.color, cursor: "pointer" }}
            onClick={() => navigate(item.route)}
          >
            <div className="dashboard-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <div className="dashboard-text">
              <h3>{item.title}</h3>
              <p>{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="dashboard-analytics">
        <h3>Category Analytics</h3>
        <div className="analytics-charts">
          <div className="chart-card">
            <h4>Product Categories</h4>
            <Pie data={productPieData} />
          </div>
          <div className="chart-card">
            <h4>Service Categories</h4>
            <Pie data={servicePieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
