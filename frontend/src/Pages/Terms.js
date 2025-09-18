// src/Pages/TermsAndConditions.jsx
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Terms= () => {
  return (
    <>
      <Navbar />
<div className="legal-page"><div className="legal-container">
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#D84040] to-[#A31D1D] bg-clip-text text-transparent mb-10">
            Terms & Conditions
          </h1>

          {/* Use of Website */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Use of Website</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>You agree to use this website only for lawful purposes.</li>
              <li>You shall not misuse the site or try to harm its functionality.</li>
            </ul>
          </section>

          {/* Products & Services */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Products & Services</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>All products/services shown are subject to availability.</li>
              <li>Prices and specifications may change without prior notice.</li>
            </ul>
          </section>

          {/* Orders & Payments */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Orders & Payments</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>By placing an order, you confirm that the information provided is correct.</li>
              <li>Payments must be made through the accepted methods mentioned on the website.</li>
            </ul>
          </section>

          {/* Delivery */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Delivery</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Delivery times are estimates and may vary.</li>
              <li>We are not responsible for delays caused by third-party couriers.</li>
            </ul>
          </section>

          {/* Returns & Refunds */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Returns & Refunds</h2>
            <p className="text-gray-700">
              Returns or refunds will be accepted as per our company’s return policy.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Intellectual Property</h2>
            <p className="text-gray-700">
              All content, logos, and images on this site belong to the company. You may not copy or use them without permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Limitation of Liability</h2>
            <p className="text-gray-700">
              We are not liable for any loss, damage, or inconvenience caused by using our website or products.
            </p>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Privacy</h2>
            <p className="text-gray-700">
              Personal information collected will be handled as per our privacy policy.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-[#D84040] mb-2">Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of India. Any disputes will be handled under the jurisdiction of Coimbatore, Tamil Nadu.
            </p>
          </section>
        </div>
      </div>
      </div></div>

      <Footer />
    </>
  );
};

export default Terms;
