// GlowingCircuit.js
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import CircuitPaths from "./GlowingCircuitPaths";
import "../Styles/GlowingCircuit.css";

const GlowingCircuit = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");

    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.setAttribute("stroke-dasharray", length);
      path.setAttribute("stroke-dashoffset", length);

      // Animate path drawing
      anime({
        targets: path,
        strokeDashoffset: [length, 0],
        duration: 2500,
        delay: index * 100,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });

      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute("r", "2.5");
      pulse.setAttribute("fill", "#D4AF37"); // Changed to match background gold
      svg.appendChild(pulse);

      const motionPath = anime.path(path);
      anime({
        targets: pulse,
        translateX: motionPath("x"),
        translateY: motionPath("y"),
        easing: "linear",
        duration: 2500,
        delay: index * 100,
        loop: true,
      });
    });
  }, []);

  return (
    <div className="circuit-container">
      <svg
        className="circuit"
        viewBox="0 0 1920 1080" // Match background image resolution
        preserveAspectRatio="xMidYMid slice"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#D4AF37" strokeWidth="1"> // Changed stroke color
          {CircuitPaths}
        </g>
      </svg>
    </div>
  );
};

export default GlowingCircuit;