export interface Technology {
  name: string;
  icon: string; // Icon component name or URL
  color: string; // Tailwind color class
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  thumbnail: string;
  overview: {
    problemStatement: string;
    role: string;
    duration: string;
    team?: string;
  };
  technologies: Technology[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  challenges: {
    problem: string;
    solution: string;
  }[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
  nextProject?: string; // ID of the next project for navigation
  prevProject?: string; // ID of the previous project for navigation
}

export const technologies: { [key: string]: Technology } = {
  react: {
    name: 'React',
    icon: 'react',
    color: 'text-blue-500',
  },
  typescript: {
    name: 'TypeScript',
    icon: 'typescript',
    color: 'text-blue-600',
  },
  tailwind: {
    name: 'Tailwind CSS',
    icon: 'tailwind',
    color: 'text-cyan-500',
  },
  // Add more technologies as needed
};

export const projects: Project[] = [
  {
    id: 'mudita-store',
    title: 'Mudita Store E-commerce',
    shortDescription: 'A modern e-commerce platform built with React and Magento',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c',
    overview: {
      problemStatement: 'Create a scalable and user-friendly e-commerce platform that provides seamless shopping experience while maintaining high performance.',
      role: 'Lead Frontend Developer',
      duration: '6 months',
      team: 'Collaborated with 3 team members',
    },
    technologies: [
      technologies.react,
      technologies.typescript,
      technologies.tailwind,
      // Add more technologies
    ],
    keyFeatures: [
      {
        title: 'Dynamic Product Catalog',
        description: 'Implemented a responsive product catalog with advanced filtering and sorting capabilities.',
      },
      {
        title: 'Real-time Cart Updates',
        description: 'Built a seamless shopping cart experience with real-time updates and animations.',
      },
      // Add more features
    ],
    challenges: [
      {
        problem: 'Performance optimization with large product catalog',
        solution: 'Implemented virtualization and lazy loading techniques to handle large datasets efficiently.',
      },
      // Add more challenges
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1557821552-17105176677c',
        alt: 'Mudita Store Homepage',
        caption: 'Modern and clean homepage design',
      },
      // Add more images
    ],
    liveUrl: 'https://mudita-store.com',
    githubUrl: 'https://github.com/username/mudita-store',
    nextProject: 'viewfinders-production',
    prevProject: 'portfolio-website',
  },
  // Add more projects
]; 