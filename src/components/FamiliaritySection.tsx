import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const FamiliaritySection = () => {
  const skills = {
    coding: [
      { name: 'React', logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
      { name: 'TypeScript', logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
      { name: 'Node.js', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
      { name: 'JavaScript', logo: 'https://cdn.worldvectorlogo.com/logos/logo-javascript.svg' },
      { name: 'Python', logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
      { name: 'Vue.js', logo: 'https://cdn.worldvectorlogo.com/logos/vue-9.svg' },
      { name: 'Angular', logo: 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg' },
      { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
      { name: 'Docker', logo: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
      { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
      { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
      { name: 'GraphQL', logo: 'https://cdn.worldvectorlogo.com/logos/graphql.svg' },
    ],
    design: [
      { name: 'Figma', logo: 'https://cdn.worldvectorlogo.com/logos/figma-5.svg' },
      { name: 'Adobe XD', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-xd-2.svg' },
      { name: 'Photoshop', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg' },
      { name: 'Illustrator', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg' },
      { name: 'After Effects', logo: 'https://cdn.worldvectorlogo.com/logos/after-effects-cc.svg' },
      { name: 'Sketch', logo: 'https://cdn.worldvectorlogo.com/logos/sketch-2.svg' },
      { name: 'InVision', logo: 'https://cdn.worldvectorlogo.com/logos/invision.svg' },
      { name: 'Blender', logo: 'https://cdn.worldvectorlogo.com/logos/blender-2.svg' },
      { name: 'Cinema 4D', logo: 'https://cdn.worldvectorlogo.com/logos/cinema-4d.svg' },
      { name: 'Premiere Pro', logo: 'https://cdn.worldvectorlogo.com/logos/premiere-cc.svg' },
    ],
    companies: [
      { name: 'Apple', logo: 'https://cdn.worldvectorlogo.com/logos/apple.svg' },
      { name: 'Google', logo: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg' },
      { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
      { name: 'Amazon', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg' },
      { name: 'Meta', logo: 'https://cdn.worldvectorlogo.com/logos/facebook-3.svg' },
      { name: 'Netflix', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-4.svg' },
      { name: 'Spotify', logo: 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg' },
      { name: 'Twitter', logo: 'https://cdn.worldvectorlogo.com/logos/twitter-6.svg' },
      { name: 'LinkedIn', logo: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg' },
      { name: 'Adobe', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-2.svg' },
      { name: 'IBM', logo: 'https://cdn.worldvectorlogo.com/logos/ibm.svg' },
      { name: 'Intel', logo: 'https://cdn.worldvectorlogo.com/logos/intel-2.svg' },
    ],
  };

  return (
    <section id="skills" className="section-padding bg-black/80">
      <div className="container-custom">
        <h2 className="section-title">Technical <span className="text-white">Expertise</span></h2>
        <p className="section-subtitle">Specialized skills developed through years of hands-on experience</p>
        
        <div className="mt-12 space-y-16">
          {/* Development Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Development Skills</h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                skipSnaps: true,
                inViewThreshold: 0.5,
              }}
              className="w-full"
            >
              <CarouselContent className="px-4 animate-carousel">
                {skills.coding.map((skill) => (
                  <CarouselItem key={skill.name} className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
                    <Card className="hover-scale backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 group">
                      <CardContent className="flex flex-row items-center justify-start gap-4 p-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 to-portfolio-secondary/20 rounded-md blur-sm group-hover:blur-md transition-all duration-300" />
                          <img src={skill.logo} alt={skill.name} className="w-12 h-12 object-contain animate-pulse-gentle relative z-10" />
                        </div>
                        <p className="font-medium text-white whitespace-nowrap">{skill.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Design Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Design Skills</h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                skipSnaps: true,
                inViewThreshold: 0.5,
              }}
              className="w-full"
            >
              <CarouselContent className="px-4 animate-carousel-reverse">
                {skills.design.map((skill) => (
                  <CarouselItem key={skill.name} className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
                    <Card className="hover-scale backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 group">
                      <CardContent className="flex flex-row items-center justify-start gap-4 p-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 to-portfolio-secondary/20 rounded-md blur-sm group-hover:blur-md transition-all duration-300" />
                          <img src={skill.logo} alt={skill.name} className="w-12 h-12 object-contain animate-pulse-gentle relative z-10" />
                        </div>
                        <p className="font-medium text-white whitespace-nowrap">{skill.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Company Logos */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Trusted By</h3>
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                skipSnaps: true,
                inViewThreshold: 0.5,
              }}
              className="w-full"
            >
              <CarouselContent className="px-4 animate-carousel">
                {skills.companies.map((company) => (
                  <CarouselItem key={company.name} className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
                    <Card className="hover-scale backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10">
                      <CardContent className="flex flex-row items-center justify-start gap-4 p-4">
                        <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain animate-pulse-gentle" />
                        <p className="font-medium text-white whitespace-nowrap">{company.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamiliaritySection;
