import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Login.css"; // same styling
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("❌ Passwords do not match!", { position: "top-center", autoClose: 3000 });
    }

    setLoading(true);
    try {
      await axios.post(`https://www.rtecsolutionspvtltd.com/api/admin/reset-password/${token}`, {
        password: form.password,
      });
      toast.success("✅ Password reset successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/admin/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Reset failed.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <video className="login-bg-video" autoPlay muted loop playsInline>
        <source src="/assets/Animations/Login.mp4" type="video/mp4" />
      </video>

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <img src="/assets/Logo.png" alt="Logo" className="admin-login-logo" />
        <h2>Reset Password</h2>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="forgot-password-link">
          <span onClick={() => navigate("/admin/login")}>Back to Login</span>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
