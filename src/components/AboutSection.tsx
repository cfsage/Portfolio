
import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
        <p className="section-subtitle">My journey, experience, and what drives my passion in this industry</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-portfolio-primary/20 rounded-lg"></div>
            <div className="relative overflow-hidden rounded-lg w-full h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Working on computer" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background/90 to-transparent p-6">
                <p className="text-xl font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">Turning ideas into digital reality</p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold mb-4">My Story</h3>
            <p className="mb-4">
              I'm a versatile professional with a passion for creating compelling digital experiences. With expertise spanning 
              video editing, graphic design, social media management, and frontend development, I bring a holistic approach to every project.
            </p>
            <p className="mb-6">
              My journey began as a freelance designer, which evolved into a deep passion for all aspects of digital creation. 
              I'm currently expanding my skills through ongoing education while delivering high-quality work to clients worldwide.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card rounded-lg p-4 text-center hover-scale">
                <Briefcase className="mx-auto mb-2 text-portfolio-primary" />
                <h4 className="font-bold">5+ Years</h4>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center hover-scale">
                <Award className="mx-auto mb-2 text-portfolio-primary" />
                <h4 className="font-bold">70+</h4>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center hover-scale">
                <GraduationCap className="mx-auto mb-2 text-portfolio-primary" />
                <h4 className="font-bold">4+</h4>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="#portfolio">View My Work</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
