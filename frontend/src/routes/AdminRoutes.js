// src/routes/AdminRoutes.js

import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../admin/Login";
import Dashboard from "../admin/Dashboard";
import Products from "../admin/Products";
import Services from "../admin/Services";
import AdminTestimonials from "../admin/AdminTestimonials"; // ⬅️ Import testimonials admin page
import ForgotPassword from "../admin/ForgotPassword";
import ResetPassword from "../admin/ResetPassword";
import AdminLayout from "../admin/components/AdminLayout";
import PrivateRoute from "./PrivateRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* 🟢 Public Login Route */}
      <Route path="login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />


      {/* 🔒 Protected Routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="products"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Products />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="services"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Services />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="testimonials" // ⬅️ Lowercase & consistent path
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminTestimonials />
            </AdminLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
