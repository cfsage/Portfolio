import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Image, Code, Instagram, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const projectData = [
  {
    id: 1,
    title: "Corporate Brand Video",
    description: "Full production of company overview video",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "video",
    link: "#"
  },
  {
    id: 2,
    title: "Travel Montage",
    description: "Cinematic video showcasing global destinations",
    image: "https://images.unsplash.com/photo-1518353053542-7ea33d942319?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "video",
    link: "#"
  },
  {
    id: 3,
    title: "Product Launch",
    description: "Promotional video for new tech product",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "video",
    link: "#"
  },
  {
    id: 4,
    title: "Brand Identity",
    description: "Complete rebrand for tech startup",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "design",
    link: "#"
  },
  {
    id: 5,
    title: "Marketing Collateral",
    description: "Print and digital marketing materials",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "design",
    link: "#"
  },
  {
    id: 6,
    title: "UI/UX Design",
    description: "Mobile app interface design",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "design",
    link: "#"
  },
  {
    id: 7,
    title: "E-Commerce Website",
    description: "Fully responsive online store with cart functionality",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "development",
    link: "#"
  },
  {
    id: 8,
    title: "Portfolio Template",
    description: "Customizable portfolio site for creatives",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "development",
    link: "#"
  },
  {
    id: 9,
    title: "Blog Platform",
    description: "Custom CMS and frontend for content creators",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "development",
    link: "#"
  },
  {
    id: 10,
    title: "Brand Campaign",
    description: "Multi-platform social media campaign",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "social",
    link: "#"
  },
  {
    id: 11,
    title: "Influencer Partnership",
    description: "Campaign with industry influencers",
    image: "https://images.unsplash.com/photo-1559867226-e1189b664b3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "social",
    link: "#"
  },
  {
    id: 12,
    title: "Product Ad Campaign",
    description: "Targeted ads with 3.5x ROI",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "ads",
    link: "#"
  },
  {
    id: 13,
    title: "Lead Generation",
    description: "Campaign resulting in 200+ qualified leads",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "ads",
    link: "#"
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        <h2 className="section-title font-heading">My <span className="gradient-text">Portfolio</span></h2>
        <p className="section-subtitle font-sans">
          Browse through my latest work across different specializations
        </p>
        
        <Tabs defaultValue="all" className="w-full mt-8">
          <div className="flex justify-center mb-8">
            <TabsList className="h-auto flex-wrap backdrop-blur-sm bg-muted/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                <Video className="h-4 w-4 mr-2" />
                Video Editing
              </TabsTrigger>
              <TabsTrigger value="design" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                <Image className="h-4 w-4 mr-2" />
                Graphic Design
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                <Code className="h-4 w-4 mr-2" />
                Development
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                <Instagram className="h-4 w-4 mr-2" />
                Social Media
              </TabsTrigger>
              <TabsTrigger value="ads" className="data-[state=active]:bg-portfolio-primary data-[state=active]:text-primary-foreground">
                <LineChart className="h-4 w-4 mr-2" />
                Advertising
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData
                .slice(0, 6)
                .map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))
              }
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.filter(p => p.category === "video").map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="design" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.filter(p => p.category === "design").map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="development" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.filter(p => p.category === "development").map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.filter(p => p.category === "social").map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ads" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.filter(p => p.category === "ads").map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const PortfolioCard = ({ project }: { project: ProjectProps }) => {
  return (
    <Card className="overflow-hidden hover-scale backdrop-blur-sm bg-card/40 border border-white/10">
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-heading">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="mr-2">
          <a href={project.link} target="_blank" rel="noreferrer">View Live</a>
        </Button>
        <Button asChild size="sm">
          <Link to={`/project/${project.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PortfolioSection;
