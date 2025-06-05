import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Code, Image, Video, Instagram, LineChart } from "lucide-react";
import { projectData } from './PortfolioSection';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectData.find(p => p.id === Number(projectId));
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/#portfolio">Back to Portfolio</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'design':
        return <Image className="h-5 w-5" />;
      case 'development':
        return <Code className="h-5 w-5" />;
      case 'social':
        return <Instagram className="h-5 w-5" />;
      case 'ads':
        return <LineChart className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const mockDetails = {
    objectives: "Create a visually engaging and user-friendly interface that effectively communicates the brand's core values while ensuring an intuitive user experience.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Three.js", "Figma"],
    challenges: "Balancing creative design elements with performance optimization while ensuring cross-browser compatibility and responsive behavior across all device types.",
    outcome: "The project resulted in a 40% increase in user engagement and a 25% reduction in bounce rate. Client reported significant positive feedback on the new design.",
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="container-custom">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/#portfolio" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Showcase */}
          <div className="lg:col-span-2">
            <div className="h-[50vh] md:h-[60vh] rounded-xl overflow-hidden mb-6">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center px-3 py-1 rounded-full bg-portfolio-glass border border-portfolio-primary/30">
                {getCategoryIcon(project.category)}
                <span className="ml-2 capitalize">{project.category}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
            
            {/* Additional Mock Images */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-video rounded-md overflow-hidden">
                  <img 
                    src={`https://picsum.photos/600/400?random=${i+1}`} 
                    alt={`${project.title} detail ${i+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Project Details */}
          <div>
            <Card className="backdrop-blur-sm bg-card/40 border border-white/10 mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-portfolio-primary mb-2">Objectives</h4>
                    <p className="text-sm">{mockDetails.objectives}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-portfolio-primary mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockDetails.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-portfolio-glass border border-portfolio-primary/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-portfolio-primary mb-2">Challenges</h4>
                    <p className="text-sm">{mockDetails.challenges}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-portfolio-primary mb-2">Outcome</h4>
                    <p className="text-sm">{mockDetails.outcome}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild className="w-full">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                View Live Project
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
