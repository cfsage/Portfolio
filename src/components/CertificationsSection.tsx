
import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import GlitchText from "./ui/GlitchText";
import BlurText from "./ui/BlurText";

const CertificationsSection = () => {
  const certifications = [
    {
      id: 1,
      title: "Meta Front-End Developer Specialization",
      issuer: "Meta",
      date: "June 2023",
      image: "https://img.icons8.com/fluency/96/meta-new.png",
      description: "Skills: HTML, CSS, JavaScript, React, Version Control, UX/UI Design, Capstone Project.",
    },
    {
      id: 2,
      title: "Meta Social Media Marketing Specialization",
      issuer: "Meta",
      date: "November 2023",
      image: "https://img.icons8.com/fluency/96/meta-new.png",
      description: "Skills: Social Media Management, Content Strategy, Meta Advertising, Analytics, Capstone Project.",
    },
    {
      id: 3,
      title: "Google IT Support Specialization",
      issuer: "Google",
      date: "September 2024",
      image: "https://img.icons8.com/color/96/google-logo.png",
      description: "Skills: Technical Support, Networking, Operating Systems, System Administration, IT Security.",
    },
    {
      id: 4,
      title: "TryHackMe: Advent of Cyber 2024 Certificate",
      issuer: "TryHackMe",
      date: "Dec 2024",
      image: "https://tryhackme.com/img/THM-logo.png",
      description: "Hands-on cybersecurity challenges and learning.",
    },
    {
      id: 5,
      title: "Google Cloud: Create a Custom Network and Apply Firewall Rules",
      issuer: "Google Cloud",
      date: "Oct 2024",
      image: "https://img.icons8.com/color/96/google-cloud.png",
      description: "Practical experience in cloud networking.",
    },
    {
      id: 6,
      title: "Packt: Ethical Hacking Foundations",
      issuer: "Packt",
      date: "Oct 2024",
      image: "https://www.packtpub.com/media/Packt_Logo.png",
      description: "Foundational knowledge in ethical hacking principles.",
    },
    {
      id: 7,
      title: "IBM: Introduction to Software Engineering",
      issuer: "IBM",
      date: "Oct 2024",
      image: "https://img.icons8.com/color/96/ibm.png",
      description: "Introduction to software development methodologies.",
    },
    {
      id: 8,
      title: "IBM: Introduction to Cybersecurity Careers",
      issuer: "IBM",
      date: "Oct 2024",
      image: "https://img.icons8.com/color/96/ibm.png",
      description: "Overview of cybersecurity career paths.",
    },
    {
      id: 9,
      title: "Google: Foundations of Project Management",
      issuer: "Google",
      date: "Sep 2024",
      image: "https://img.icons8.com/color/96/google-logo.png",
      description: "Fundamentals of project management.",
    },
    {
      id: 10,
      title: "Google: Foundations of Cybersecurity",
      issuer: "Google",
      date: "Sep 2024",
      image: "https://img.icons8.com/color/96/google-logo.png",
      description: "Basic concepts of cybersecurity.",
    },
    {
      id: 11,
      title: "IBM: Introduction to Cloud Computing",
      issuer: "IBM",
      date: "June 2024",
      image: "https://img.icons8.com/color/96/ibm.png",
      description: "Introduction to cloud computing concepts.",
    },
    {
      id: 12,
      title: "IBM: Getting Started with Git and GitHub",
      issuer: "IBM",
      date: "June 2024",
      image: "https://img.icons8.com/color/96/ibm.png",
      description: "Basics of version control with Git and GitHub.",
    },
    {
      id: 13,
      title: "Google: Foundations of User Experience (UX) Design",
      issuer: "Google",
      date: "Jan 2024",
      image: "https://img.icons8.com/color/96/google-logo.png",
      description: "Foundational principles of UX design.",
    },
    {
      id: 14,
      title: "University of Colorado Boulder: Graphic Design",
      issuer: "Coursera",
      date: "Nov 2023",
      image: "https://img.icons8.com/color/96/coursera.png",
      description: "Comprehensive graphic design course.",
    },
    {
      id: 15,
      title: "IBM: Introduction to Artificial Intelligence (AI)",
      issuer: "IBM",
      date: "Nov 2023",
      image: "https://img.icons8.com/color/96/ibm.png",
      description: "Basic concepts of Artificial Intelligence.",
    },
    {
      id: 16,
      title: "How to Optimize Your Instagram Account",
      issuer: "Coursera Project Network",
      date: "Oct 2023",
      image: "https://img.icons8.com/color/96/instagram-new.png",
      description: "Practical guide to Instagram optimization.",
    },
    {
      id: 17,
      title: "Search Engine Optimization (SEO) with Squarespace",
      issuer: "Coursera Project Network",
      date: "Oct 2023",
      image: "https://img.icons8.com/color/96/squarespace.png",
      description: "SEO strategies for Squarespace websites.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title font-heading">
          <GlitchText 
            glitchOnHover={true} 
            glitchOnLoad={true} 
            duration={0.8} 
            intensity={0.8}
            className="inline-block mr-2"
          >
            My
          </GlitchText> 
          <span className="gradient-text">
            <GlitchText 
              glitchOnHover={true} 
              duration={1.0} 
              intensity={1.2}
              className="inline-block"
            >
              Certifications
            </GlitchText>
          </span>
        </h2>
        <p className="section-subtitle font-sans">
          <BlurText 
            text="Professional qualifications that validate my expertise and knowledge" 
            animateBy="words" 
            delay={100} 
            stepDuration={0.25}
          />
        </p>
        
        {/* Timeline Display */}
        <div className="mt-16 relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-portfolio-primary/80 to-portfolio-secondary/80 rounded-full"></div>
          
          {/* Certifications */}
          <div className="space-y-24">
            {certifications.map((cert, index) => (
              <div 
                key={cert.id} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-portfolio-primary rounded-full border-2 border-background flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
                
                {/* Content Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <Card className={`w-full max-w-md relative overflow-hidden group backdrop-blur-sm bg-card/40 border border-white/10 hover-scale ${
                  index % 2 === 0 ? 'mr-12 md:mr-24' : 'ml-12 md:ml-24'
                }`}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-heading mb-1">
                      <GlitchText 
                        glitchOnHover={true} 
                        duration={0.5} 
                        intensity={0.6}
                        className="cursor-pointer"
                      >
                        {cert.title}
                      </GlitchText>
                    </CardTitle>
                    <CardDescription className="text-xl font-heading">
                      <BlurText 
                        text={cert.date} 
                        animateBy="letters" 
                        delay={50} 
                        stepDuration={0.15}
                      />
                    </CardDescription>
                  </CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full p-2">
                    <img 
                      src={cert.image} 
                      alt={`${cert.title} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardContent>
                    <p className="text-center font-medium text-lg mb-1">{cert.issuer}</p>
                    <p className="text-center text-muted-foreground">{cert.description}</p>
                  </CardContent>
                    <motion.img
                        src={cert.image}
                        alt={cert.issuer}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                      />
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
