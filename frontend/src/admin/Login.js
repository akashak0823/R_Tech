import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);

      // save token in localStorage
      localStorage.setItem("adminToken", res.data.token);

      toast.success("✅ Login successful!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate("/admin/dashboard"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Login failed. Try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Background Video */}
      <video className="login-bg-video" autoPlay muted loop playsInline>
        <source src="/assets/Animations/Login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Form */}
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <img src="/assets/Logo.png" alt="Logo" className="admin-login-logo" />
        <h2>Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password */}
        <p className="forgot-password-link">
          <span onClick={() => navigate("/admin/forgot-password")}>
            Forgot Password?
          </span>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
