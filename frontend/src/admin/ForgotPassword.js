import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/admin/Login.css"; // same styling
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://rtecsolutionspvtltd.com/api//admin/forgot-password", { email });
      toast.success("✅ Reset link sent to your email!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => navigate("/admin/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Error sending email.", {
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
        <h2>Forgot Password</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="forgot-password-link">
          <span onClick={() => navigate("/admin/login")}>Back to Login</span>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
