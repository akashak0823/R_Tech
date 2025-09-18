import React from "react";


// Image imports
import hardwareImg from "../assets/Industrial Hardware & Fasteners.jpg";
import filtrationImg from "../assets/Filtration & Process Equipment.jpg";
import autoImg from "../assets/Auto Components & Precision Parts.jpg";
import sensorsImg from "../assets/Empowering Machinery Through Smart Sensors.jpg";




export const servicesData = [
  {
    title: "Industrial Hardware & Fasteners",
    description:
      "We supply a wide range of heavy-duty fasteners and industrial hardware, including hex bolts, stainless steel nuts, washers, and threaded rods. Our custom sourcing ensures the right fit for your mechanical and structural needs.",
    keyFeatures: [
      "Hex Bolts, SS Nuts, Washers, Threaded Rods",
      "Custom hardware supply",
      "Corrosion-resistant & high-strength options",
      "Support for construction and manufacturing",
    ],
    category: "Industrial Supply",
    icon: "hardware",
    slug: "industrial-hardware",
    image: hardwareImg,
  },
  {
    title: "Filtration & Process Equipment",
    description:
      "We deliver end-to-end filtration solutions — from filter bags and cages to advanced dust collector systems and strainers. Designed for air, gas, and liquid filtration in industrial operations.",
    keyFeatures: [
      "Filter Bags & Cages (Dust, Liquid, High-Temp, Anti-Static)",
      "Cartridges (Pleated, HEPA, Activated Carbon)",
      "Bag Housings, Cyclone Separators, Scrubbers",
      "Y-Strainers, Valves, Accessories",
    ],
    category: "Process Engineering",
    icon: "filtration",
    slug: "filtration-equipment",
    image: filtrationImg,
  },
  {
    title: "Auto Components & Precision Parts",
    description:
      "We manufacture and supply high-precision auto components and mechanical parts including CNC shafts, yokes, axle spindles, bushings, and knuckles. Ideal for OEMs and custom builds.",
    keyFeatures: [
      "CNC Shafts, Yokes, Spindles, Rod Ends",
      "Precision bushings and knuckles",
      "Custom-machined parts available",
      "Used in automotive and machinery sectors",
    ],
    category: "Precision Engineering",
    icon: "auto",
    slug: "auto-components",
    image: autoImg,
  },
  {
    title: "Empowering Machinery Through Smart Sensors",
    description:
      "Integrate smart sensor solutions into your industrial systems for real-time monitoring, predictive maintenance, and automation. We offer IIoT-enabled sensors tailored for your application.",
    keyFeatures: [
      "Temperature, Pressure, Vibration, Proximity Sensors",
      "Flow & Humidity Monitoring",
      "IIoT-ready and PLC-compatible",
      "Custom sensor integration services",
    ],
    category: "Industrial Automation",
    icon: "sensors",
    slug: "smart-sensors",
    image: sensorsImg,
  },
];
