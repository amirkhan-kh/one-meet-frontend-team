import React from 'react';
import './TrustedCompanies.css';

import logo42 from '../../../assets/42.jpg';
import logoFalcon from '../../../assets/falcon.jpeg';
import logoInk from '../../../assets/ink.jpeg';
import linkedIn from '../../../assets/linkedin.jpeg';
import google from '../../../assets/google.jpeg';

const logos = [
  { src: logo42, name: '42' },
  { src: logoFalcon, name: 'Falcon' },
  { src: logoInk, name: 'Ink' },
  { src: linkedIn, name: 'LinkedIn' },
  { src: google, name: 'Google' },
];

export default function TrustedCompanies() {
  // Duplicate logos to create an infinite loop effect
  const scrollingLogos = [...logos, ...logos];

  return (
    <section className="trusted-section fade-in-up">
      <div className="trusted-content">
        <h2 className="trusted-heading primary-text">Trusted by companies</h2>
        <p className="trusted-subtitle">
          These teams already use OneMeet to automate early interviews and discover great talent faster.
        </p>
        <div className="logo-marquee">
          <div className="logo-track">
            {scrollingLogos.map((logo, index) => (
              <div key={index} className="logo-card">
                <img src={logo.src} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
