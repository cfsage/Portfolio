
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import FuzzyText from './ui/FuzzyText';
import StarBorder from './ui/StarBorder';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-background to-accent/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <FuzzyText 
            fontSize="clamp(2rem, 6vw, 4rem)"
            fontWeight={700}
            color="#60a5fa"
            className="block mb-2"
          >
            Hi, I'm
          </FuzzyText>
          <FuzzyText 
            fontSize="clamp(2.5rem, 8vw, 5rem)"
            fontWeight={900}
            color="#ffffff"
            hoverIntensity={0.8}
          >
            Syed Huzaifa
          </FuzzyText>
        </motion.div>
        <StarBorder 
          className="mb-8 p-6 rounded-lg"
          color="#a855f7"
          starCount={15}
          speed={1.5}
        >
          <motion.div 
            className="text-xl md:text-2xl lg:text-3xl h-20 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'React Specialist',
                2000,
                'UI/UX Enthusiast',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: 'inherit', display: 'inline-block', color: '#a855f7' }}
              repeat={Infinity}
            />
          </motion.div>
        </StarBorder>
            <p className="text-lg mb-8 max-w-xl">
              A highly adaptable and self-motivated freelance professional offering a comprehensive suite of digital services, including Front-End Development, Social Media Marketing, E-commerce Management (Magento), IT Support, Graphic Design, and Video Editing. Leveraging extensive training from Meta and Google, combined with practical experience using industry-standard tools like Adobe Creative Suite (Premiere Pro, After Effects, Photoshop) and DaVinci Resolve, to deliver high-quality remote solutions for diverse client needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="#contact">
                  Hire Me
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="w-60 h-60 md:w-80 md:h-80 bg-portfolio-primary/20 rounded-full absolute -top-4 -left-4 z-0 animate-pulse"></div>
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 cyber-border">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Professional headshot"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="cyber-glow"></div>
              <div className="absolute -bottom-2 -right-2 bg-card shadow-lg rounded-lg px-4 py-2 z-20">
                <p className="text-sm font-medium">5+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
