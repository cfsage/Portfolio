import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"; // Import the plugin
import React from "react"; // Import React

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechNova Inc.",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      companyLogo: "https://logo.clearbit.com/technova.io",
      testimonial: "John's video editing skills transformed our product launch. The quality and creativity exceeded our expectations, resulting in significantly higher engagement than our previous campaigns.",
      stars: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder",
      company: "DesignPulse",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      companyLogo: "https://logo.clearbit.com/designpulse.com",
      testimonial: "Working with John was a game-changer for our brand. His design work perfectly captured our vision, and his ability to deliver front-end development alongside it saved us time and resources.",
      stars: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Content Creator",
      company: "Lifestyle Blog",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      companyLogo: "https://logo.clearbit.com/lifestyleblog.com",
      testimonial: "John revitalized my social media presence with strategic management and stunning graphics. Within three months, my following increased by 40% with much higher engagement rates.",
      stars: 5,
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "InnovateTech",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      companyLogo: "https://logo.clearbit.com/innovatetech.com",
      testimonial: "John's technical expertise and attention to detail were impressive. He delivered a complex web application that exceeded our requirements and was completed ahead of schedule.",
      stars: 5,
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Brand Manager",
      company: "Global Brands",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      companyLogo: "https://logo.clearbit.com/globalbrands.com",
      testimonial: "The brand identity John created for us was exceptional. His understanding of our market and ability to translate our vision into compelling visuals was remarkable.",
      stars: 5,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Product Manager",
      company: "TechSolutions",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      companyLogo: "https://logo.clearbit.com/techsolutions.com",
      testimonial: "John's UI/UX design work significantly improved our product's user experience. His attention to detail and user-centered approach made a real difference in our metrics.",
      stars: 5,
    }
  ];

  // Initialize the plugin
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }) // Configure delay (3000ms = 3s) and other options
  );

  return (
    <section id="testimonials" className="section-padding bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title">Client <span className="gradient-text">Testimonials</span></h2>
        <p className="section-subtitle">What my clients say about working with me</p>

        <Carousel
          plugins={[plugin.current]} // Pass the plugin directly
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mt-12"
        >
          <CarouselContent className="px-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="hover-scale bg-card group">
                  <CardHeader className="pb-0">
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/10 to-portfolio-secondary/10 rounded-md blur-sm group-hover:blur-md transition-all duration-300" />
                      <img 
                        src={testimonial.companyLogo} 
                        alt={testimonial.company} 
                        className="w-16 h-16 object-contain mx-auto mb-6 relative z-10"
                      />
                    </div>
                    <p className="italic text-muted-foreground mb-6">"{testimonial.testimonial}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
