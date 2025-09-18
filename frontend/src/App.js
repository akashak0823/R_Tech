// src/App.js
import React, { Suspense, lazy } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import provider
import Loader from './Components/Loader';
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Chatbot from "./Pages/Chatbot";
import ScrollToTop from "./Components/ScrollToTop";

// ✅ Lazy load all pages
const Home = lazy(() => import('./Pages/Home'));
const Services = lazy(() => import('./Pages/Services'));
const ServiceDetails = lazy(() => import('./Pages/ServiceDetails'));
const Products = lazy(() => import('./Pages/Products'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));
const AllProducts = lazy(() => import('./Pages/AllProducts'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));

// ✅ Lazy load admin routes too
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<Loader />}>
            <ScrollToTop />
            <Routes>
              {/* 🌐 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* 🔒 Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </Suspense>

          {/* ✅ Chatbot is global */}
          <Chatbot />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
