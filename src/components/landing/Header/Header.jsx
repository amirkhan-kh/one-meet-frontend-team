import React, { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize if desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="ai-header">
      <div className="ai-container">
        <a href="/" className="ai-logo">
          OneMeet
        </a>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={`ai-nav ${menuOpen ? "show" : ""}`}>
          <a
            href="#guide"
            className="underline-hover"
            onClick={() => setMenuOpen(false)}
          >
            Guide
          </a>
          <a
            href="#pricing"
            className="underline-hover"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </a>
           <a
            href="/login"
            className="underline-hover"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </a>
          <a href="/signup" className="ai-cta" onClick={() => setMenuOpen(false)}>
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
