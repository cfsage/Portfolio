
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-background to-accent/10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-portfolio-primary font-medium mb-2">Hi there, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light mb-6">
              <TypeAnimation
                sequence={[
                  'Multi-Skilled Professional',
                  2000,
                  'Video Editor',
                  2000,
                  'Graphics Designer',
                  2000,
                  'Frontend Developer',
                  2000,
                  'Social Media Specialist',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="gradient-text font-medium"
                repeat={Infinity}
              />
            </h2>
            <p className="text-lg mb-8 max-w-xl">
              I bring creative vision and technical expertise as a Video Editor, Graphic Designer, 
              Social Media Specialist, and Frontend Developer. Meta-certified and Google IT Support certified, 
              I transform ideas into captivating digital experiences.
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
