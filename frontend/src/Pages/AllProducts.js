import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/AllProducts.css";
import { fetchProducts } from "../api"; // 🔗 Import backend API

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();

const AllProducts = () => {
  const [categorized, setCategorized] = useState({});
  const { hash } = useLocation();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();

        const grouped = data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});

        setCategorized(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -140; // Adjust this to match your navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [hash, categorized]);

  return (
    <>
      <Navbar />
      <div className="all-products-page">
        <h1 className="page-title">All Products</h1>

        {Object.entries(categorized).map(([category, products]) => (
          <div className="category-section" key={category} id={slugify(category)}>
            <h2 className="category-title">{category}</h2>
            <div className="category-grid">
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  className="product-card"
                  key={product._id}
                >
                  <img
                    src={product.images?.[0]?.url || product.images?.[0] || product.img}
                    alt={product.name}
                    className="product-img"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
