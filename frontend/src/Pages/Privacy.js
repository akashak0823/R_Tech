// src/Pages/Privacy.jsx
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/Legal.css";

const Privacy = () => {
  return (
    <>
      <Navbar />

      <div className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>

          {/* Introduction */}
          <section className="mb-8">
            <p>
              At <strong>Rtec Solutions</strong>, we respect your privacy and are committed to
              protecting your personal information.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2>Information We Collect</h2>
            <ul>
              <li>Personal details (name, email, phone, address) when you make a purchase or inquiry.</li>
              <li>Non-personal information such as browser type, IP address, and site usage statistics.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To process and deliver your orders.</li>
              <li>To improve our website, products, and services.</li>
              <li>To communicate updates, offers, or service-related information (only with your consent).</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2>Data Protection</h2>
            <p>
              Your personal information will be stored securely and will not be shared with unauthorized
              parties.
            </p>
            <p>
              We may share data only with trusted third-party service providers (e.g., courier, payment
              gateway) necessary to complete your transaction.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2>Cookies</h2>
            <p>Our website may use cookies to enhance user experience and collect analytics.</p>
            <p>You can choose to disable cookies in your browser settings.</p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. Rtec Solutions is not responsible for the
              privacy practices of third-party websites.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2>Your Rights</h2>
            <ul>
              <li>You may request access, correction, or deletion of your personal data by contacting us.</li>
              <li>You may opt out of marketing communications at any time.</li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2>Changes to Policy</h2>
            <p>
              Rtec Solutions reserves the right to update this Privacy Policy as needed. Any changes will be
              posted on this page.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Privacy;
