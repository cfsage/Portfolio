import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { ScrollReveal } from './animations/ScrollReveal';
import BlurText from "./ui/BlurText";
import DecryptedText from "./ui/DecryptedText";
import { Link } from 'react-router-dom';

const experiences = [
  {
    year: '2023 - Present',
    title: 'Freelance Digital Professional',
    company: 'Self-Employed',
    description: 'Providing comprehensive digital services including web development, social media management, and video editing.',
  },
  {
    year: '2022 - 2023',
    title: 'E-commerce Specialist',
    company: 'Mudita Store',
    description: 'Managed e-commerce platform, created graphics, and handled social media marketing campaigns.',
  },
  {
    year: '2021 - 2022',
    title: 'Video Editor',
    company: 'Viewfinders Production',
    description: 'Edited and assembled video content using Adobe Premiere Pro and DaVinci Resolve.',
  },
];

const About = () => {
  return (
    <section id="about" className="relative z-10 min-h-screen py-24 bg-gradient-to-b from-zinc-900 to-black scroll-mt-20">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            <BlurText 
              text="About" 
              animateBy="letters" 
              className="inline-block mr-2" 
              delay={100} 
              stepDuration={0.25}
            /> 
            <span className="text-blue-500">
              <BlurText 
                text="Me" 
                animateBy="letters" 
                className="inline-block" 
                delay={100} 
                stepDuration={0.25}
              />
            </span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-lg"></div>
              <div className="relative overflow-hidden rounded-lg w-full h-[400px]">
                <motion.img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Working on computer" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                  <p className="text-xl font-medium">Biplove Yadav</p>
                  <p className="text-sm text-zinc-400">Freelance Digital Professional | Remote Work Ready</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <DecryptedText 
                  text="My Story" 
                  speed={40} 
                  maxIterations={15} 
                  sequential={true} 
                  revealDirection="start" 
                  animateOn="view" 
                  className="text-blue-500"
                />
              </h3>
              <div className="text-zinc-300 space-y-4 mb-8">
                <BlurText 
                  text="A highly adaptable and self-motivated freelance professional offering a comprehensive suite of digital services, including Front-End Development, Social Media Marketing, E-commerce Management (Magento), IT Support, Graphic Design, and Video Editing." 
                  animateBy="words" 
                  delay={50} 
                  stepDuration={0.2}
                />
                <BlurText 
                  text="Leveraging extensive training from Meta and Google, combined with practical experience using industry-standard tools like Adobe Creative Suite and DaVinci Resolve, to deliver high-quality remote solutions for diverse client needs." 
                  animateBy="words" 
                  delay={50} 
                  stepDuration={0.2}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <motion.div 
                  className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Briefcase className="mx-auto mb-2 text-blue-500" />
                  <h4 className="font-bold">5+ Years</h4>
                  <p className="text-sm text-zinc-400">Experience</p>
                </motion.div>
                <motion.div 
                  className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Award className="mx-auto mb-2 text-blue-500" />
                  <h4 className="font-bold">70+</h4>
                  <p className="text-sm text-zinc-400">Projects</p>
                </motion.div>
                <motion.div 
                  className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-4 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap className="mx-auto mb-2 text-blue-500" />
                  <h4 className="font-bold">4+</h4>
                  <p className="text-sm text-zinc-400">Certifications</p>
                </motion.div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About; 