import React from 'react';
import './Footer.css';
import { FaYoutube, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import logo from '../../../assets/footer_logo.png'; // Your cropped logo

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Left: Logo */}
        <div className="footer-left">
          <img src={logo} alt="OneMeet Logo" className="footer-logo" />
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-center">
          <a href="/contact-support">Contact Us</a>
          <a href="#guide">Guide</a>
          <a href="#pricing">Pricing</a>
        </div>

        {/* Right: Socials + message */}
        <div className="footer-right">
          <div className="footer-icons">
            <a href="https://twitter.com/onemeet" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com/company/onemeet" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://youtube.com/@onemeetapp" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
          <p className="footer-note">
            Made with <FaHeart style={{ color: 'red', verticalAlign: 'middle' }} /> to simplify hiring
          </p>
        </div>
      </div>
    </footer>
  );
}
