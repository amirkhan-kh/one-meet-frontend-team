import React from 'react';
import './PricingSection.css';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    recruiters: '1 recruiter',
    interviews: '3 interviews / mo',
    perks: [
      'All features included',
      'Screen + face recording',
      'Full scoring insights',
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Starter',
    price: '$19/mo',
    recruiters: 'Up to 5 recruiters',
    interviews: '30 interviews / mo',
    perks: [
      'Everything in Free',
      'Company dashboard access',
      'Multiple recruiters',
    ],
    buttonText: 'Choose Starter',
  },
  {
    name: 'Pro',
    price: '$99/mo',
    recruiters: 'Up to 15 recruiters',
    interviews: '300 interviews / mo',
    perks: [
      'Everything in Starter',
      'Higher volume usage',
      'More recruiters supported',
    ],
    buttonText: 'Choose Pro',
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-heading">Simple Pricing for Smart Hiring</h2>
      <p className="pricing-subtitle">
        Get started with AI-powered interviews. No setup. No credit card.
      </p>
      <div className="pricing-grid">
        {plans.map(plan => (
          <div key={plan.name} className="plan-card">
            <h3 className="plan-title">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <p className="plan-meta">{plan.recruiters}</p>
            <p className="plan-meta">{plan.interviews}</p>
            <ul className="plan-perks">
              {plan.perks.map((perk, idx) => (
                <li key={idx}>{perk}</li>
              ))}
            </ul>
            <button className="ai-cta" onClick={() => navigate('/signup')}>{plan.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
