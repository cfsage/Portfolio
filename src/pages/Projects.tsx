import React from 'react';
import { projectData } from '@/components/PortfolioSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData.map((project) => (
          <Card key={project.id} className="overflow-hidden hover-scale">
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
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
        ))}
      </div>
    </div>
  );
};

export default Projects;
