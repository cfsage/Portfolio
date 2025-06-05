
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Image, Code, Instagram, LineChart, Users } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Video Editing",
      description: "Professional editing for commercials, social media, YouTube, corporate videos, and more.",
      icon: <Video className="h-10 w-10 text-portfolio-primary" />,
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "Creative design services for branding, marketing materials, social media, and web assets.",
      icon: <Image className="h-10 w-10 text-portfolio-primary" />,
    },
    {
      id: 3,
      title: "Frontend Development",
      description: "Responsive websites and web applications using modern frameworks and best practices.",
      icon: <Code className="h-10 w-10 text-portfolio-primary" />,
    },
    {
      id: 4,
      title: "Social Media Management",
      description: "Content creation, scheduling, community management, and growth strategy across platforms.",
      icon: <Instagram className="h-10 w-10 text-portfolio-primary" />,
    },
    {
      id: 5,
      title: "Ads & Promotion",
      description: "Strategic ad campaigns for Facebook, Instagram, Google, and more with performance tracking.",
      icon: <LineChart className="h-10 w-10 text-portfolio-primary" />,
    },
    {
      id: 6,
      title: "Consulting & Training",
      description: "Expert guidance and workshops for teams looking to improve their digital skills.",
      icon: <Users className="h-10 w-10 text-portfolio-primary" />,
    },
  ];

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
        <p className="section-subtitle">Comprehensive creative and technical solutions for your digital needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ service }: { service: ServiceProps }) => {
  return (
    <Card className="border border-border hover:border-portfolio-primary/50 transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="mb-2">{service.icon}</div>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{service.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href="#contact">Hire Me</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServicesSection;
