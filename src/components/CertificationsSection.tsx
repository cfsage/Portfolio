
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const CertificationsSection = () => {
  const certifications = [
    {
      id: 1,
      title: "Meta Frontend Developer",
      issuer: "Meta",
      date: "2023",
      image: "https://img.icons8.com/fluency/96/meta-new.png",
      description: "Professional certification covering React, responsive design, and frontend development best practices.",
    },
    {
      id: 2,
      title: "Google IT Support",
      issuer: "Google",
      date: "2022",
      image: "https://img.icons8.com/color/96/google-logo.png",
      description: "Comprehensive training in IT foundations, computer networking, operating systems, and security.",
    },
    {
      id: 3,
      title: "Adobe Certified Professional",
      issuer: "Adobe",
      date: "2021",
      image: "https://img.icons8.com/color/96/adobe-creative-cloud--v1.png",
      description: "Professional-level certification in Adobe Creative Suite applications for design and video editing.",
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      issuer: "Google Digital Garage",
      date: "2021",
      image: "https://img.icons8.com/color/96/google-ads.png",
      description: "Certification in digital marketing fundamentals including SEO, SEM, social media, and analytics.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title font-heading">My <span className="gradient-text">Certifications</span></h2>
        <p className="section-subtitle font-sans">Professional qualifications that validate my expertise and knowledge</p>
        
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
                <Card className={`w-full max-w-md backdrop-blur-sm bg-card/40 border border-white/10 hover-scale ${
                  index % 2 === 0 ? 'mr-12 md:mr-24' : 'ml-12 md:ml-24'
                }`}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-heading mb-1">{cert.title}</CardTitle>
                    <CardDescription className="text-xl font-heading">{cert.date}</CardDescription>
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
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
