import React, { useEffect, useRef, useState } from 'react';
import './StepsSection.css';
import {
  FaBuilding, FaUserPlus, FaClipboardCheck, FaChartBar,
  FaHandPointRight, FaHandPointLeft
} from 'react-icons/fa';

export default function StepsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    },
    { threshold: 0.3 }
  );

  const currentSection = sectionRef.current;

  if (currentSection) {
    observer.observe(currentSection);
  }

  return () => {
    if (currentSection) observer.unobserve(currentSection);
  };
}, []);


  return (
    <section id="guide" className="steps-section" ref={sectionRef}>
      <h2 className="steps-title">How OneMeet Works</h2>

      <div className="steps-grid">
        <div className={`step step1 ${isVisible ? 'animate-left' : ''}`}>
          <div className="step-icon"><FaBuilding /></div>
          <h3>Step 1: Company Registration</h3>
          <p className="desc short">Create your company account.</p>
          <p className="desc long">Companies register to access OneMeet’s automated interviewing platform for fast, smart hiring.</p>
        </div>

        <div className="arrow arrow-right"><FaHandPointRight /></div>

        <div className={`step step2 ${isVisible ? 'animate-right' : ''}`}>
          <div className="step-icon"><FaUserPlus /></div>
          <h3>Step 2: Add Recruiters & Organize Interviews</h3>
          <p className="desc short">Invite recruiters & schedule interviews.</p>
          <p className="desc long">Recruiters add candidate details (name, email, role, language, duration) and select interview type (behavioral, technical, or custom).</p>
        </div>

        <div className={`step step4 ${isVisible ? 'animate-left' : ''}`}>
          <div className="step-icon"><FaChartBar /></div>
          <h3>Step 4: Get Results Instantly</h3>
          <p className="desc short">AI scoring & ranked results.</p>
          <p className="desc long">The platform delivers face and screen recordings, scores, and sorted rankings based on recruiter filters.</p>
        </div>

        <div className="arrow arrow-left"><FaHandPointLeft /></div>

        <div className={`step step3 ${isVisible ? 'animate-right' : ''}`}>
          <div className="step-icon"><FaClipboardCheck /></div>
          <h3>Step 3: Candidate Completes Interview</h3>
          <p className="desc short">AI-led real-time interview.</p>
          <p className="desc long">Candidates complete their interview while their screen and face are recorded — no human needed.</p>
        </div>
      </div>
    </section>
  );
}
