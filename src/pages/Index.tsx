import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import CertificationsSection from "@/components/CertificationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MouseTracker from "@/components/MouseTracker";
import FamiliaritySection from "@/components/FamiliaritySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-dark text-foreground overflow-hidden relative">
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-5 pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-portfolio-primary/20 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-portfolio-secondary/20 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      
      <MouseTracker />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FamiliaritySection />
      <PortfolioSection />
      <ServicesSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
