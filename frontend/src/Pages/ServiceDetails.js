import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/ServiceDetails.css";
import { fetchServices, fetchProducts } from "../api";
import { Helmet } from "react-helmet-async"; // ✅ SEO

const categoryKeywordsMap = {
  "Process Engineering": [
    "Filter Bags",
    "Filter Cages",
    "Filter Cartridges",
    "Bag Filter Housings",
    "Dust Collector Systems",
    "Air Intake Filters",
    "Filter Accessories",
  ],
  "Industrial Supply": ["Industrial Hardware & Fasteners"],
  "Precision Engineering": ["Auto Components & Precision Parts"],
  "Industrial Automation": ["Industrial Smart Sensors"],
};

const ServiceDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadServiceAndProducts = async () => {
      try {
        const servicesRes = await fetchServices();
        const currentService = servicesRes.data.find((s) => s.slug === slug);

        if (currentService) {
          setService(currentService);

          const keywords = categoryKeywordsMap[currentService.category] || [];
          const productsRes = await fetchProducts();
          const related = productsRes.data.filter((product) =>
            keywords.includes(product.category)
          );
          setRelatedProducts(related);
        } else {
          setService(null);
        }
      } catch (error) {
        console.error("Error loading service details:", error);
      }
    };

    loadServiceAndProducts();
  }, [slug]);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="service-not-found">Service not found.</div>
        </div>
        <Footer />
      </>
    );
  }

  const serviceImage =
    service.media?.resource_type === "image"
      ? service.media.url
      : service.image || "";

  return (
    <>
      {/* ✅ Dynamic SEO */}
      <Helmet>
        <title>{service.title} | RTec Solutions</title>
        <meta
          name="description"
          content={service.description || `Learn more about ${service.title} at RTec Solutions.`}
        />
        <meta
          name="keywords"
          content={`${service.title}, ${service.category}, RTec Solutions, Industrial Services`}
        />
        <meta property="og:title" content={`${service.title} - RTec Solutions`} />
        <meta
          property="og:description"
          content={service.description || "Explore industrial services by RTec Solutions."}
        />
        <meta property="og:image" content={serviceImage} />
        <meta
          property="og:url"
          content={`https://www.rtecsolutions.com/services/${service.slug}`}
        />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} | RTec Solutions`} />
        <meta
          name="twitter:description"
          content={service.description || `Learn more about ${service.title}`}
        />
        <meta name="twitter:image" content={serviceImage} />
      </Helmet>

      <Navbar />
      <div className="page-wrapper">
        <section
          className="service-hero"
          style={{
            backgroundImage: `url(${encodeURI(service.icon || "")})`,
          }}
        >
          <div className="hero-content">
            <h1 className="details-title">{service.title}</h1>
            <p className="details-description">{service.description}</p>

            <h3>Key Features</h3>
            <ul className="features-list">
              {service.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="related-products">
          <h3>Related Products</h3>
          <div className="related-products-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="related-product-card"
                >
                  <img
                    src={
                      product.images?.[0]?.url ||
                      product.images?.[0] ||
                      product.img
                    }
                    alt={product.name}
                    className="related-product-image"
                  />
                  <h4 className="related-product-name">{product.name}</h4>
                  <p className="related-product-description">
                    {product.description}
                  </p>
                </Link>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetails;
