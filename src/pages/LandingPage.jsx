import React from 'react';
import Header from '../components/landing/Header/Header';
import HeroSection from '../components/landing/HeroSection/HeroSection';
import StepsSection from '../components/landing/HeroSection/StepsSection';
import TrustedCompanies from '../components/landing/HeroSection/TrustedCompanies';
import PricingSection from '../components/landing/HeroSection/PricingSection';
import Footer from '../components/landing/Footer/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <StepsSection />
      <TrustedCompanies />
      <PricingSection />
      <Footer />
    </>
  );
}
