import React from 'react';
import './PricingSection.css';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    recruiters: '1 recruiter',
    interviews: '3 interview credits',
    perks: [
      'All features included',
      'Screen + face recording',
      'Full scoring insights',
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Starter Pack',
    price: '$19',
    recruiters: 'Up to 5 recruiters',
    interviews: '30 interview credits',
    perks: [
      'Everything in Free Trial',
      'Team dashboard access',
      'Multiple recruiters',
    ],
    buttonText: 'Buy Starter Pack',
  },
  {
    name: 'Pro Bundle',
    price: '$99',
    recruiters: 'Up to 15 recruiters',
    interviews: '300 interview credits',
    perks: [
      'Everything in Starter Pack',
      'Bulk credit package',
      'Advanced usage reporting',
    ],
    buttonText: 'Buy Pro Bundle',
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-heading">Top-Up Credits, Use Anytime</h2>
      <p className="pricing-subtitle">
        Pay only when you need more interview credits. No subscriptions. No commitment.
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
            <button className="ai-cta" onClick={() => navigate('/signup')}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
