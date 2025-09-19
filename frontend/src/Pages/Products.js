import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../Styles/Product.css";
import axios from "axios";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://31.97.60.209:5000/api/products");
        setProductsData(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleExplore = (slug) => {
    navigate(`/products/${slug}`);
  };

  const handleShowAll = () => {
    navigate("/all-products");
  };

  return (
    <div className="products-section">
      <motion.h2
        className="products-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Explore Categories
      </motion.h2>

      <div className="products-grid">
        {productsData.map((product, index) => (
          <motion.div
            className="product-card"
            key={product._id || product.slug}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(163, 20, 20, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExplore(product.slug)}
          >
            <motion.img
              src={product.images?.[0]?.url || product.images?.[0] || product.img}
              alt={product.name}
              className="product-image"
              whileHover={{ rotate: 2, scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <span className="explore-btn">Explore →</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="show-all-btn"
        onClick={handleShowAll}
        whileHover={{
          scale: 1.05,
          background: "linear-gradient(270deg, #a31414, #d81b1b)",
          color: "#fff",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Show All
      </motion.button>
    </div>
  );
};

export default Products;
