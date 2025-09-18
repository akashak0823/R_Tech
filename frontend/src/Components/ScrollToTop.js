// src/Components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jump to top whenever route changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
