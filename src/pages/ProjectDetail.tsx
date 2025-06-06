import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Project, projects, ProjectImage } from '@/data/projects';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SpotlightCard } from '@/components/animations/SpotlightCard';
import { FuzzyText } from '@/components/animations/FuzzyText';

const TechnologyTag: React.FC<{ name: string; icon: string; color: string }> = ({
  name,
  icon,
  color
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm ${color}`}
  >
    <span className="text-lg">{icon}</span>
    <span>{name}</span>
  </motion.div>
);

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ScrollReveal>
      <motion.div 
        className={`mb-16 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        onViewportEnter={() => setIsVisible(true)}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl font-bold mb-6 relative">
          <FuzzyText text={title} />
          <motion.div 
            className="absolute -bottom-2 left-0 h-0.5 bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: isVisible ? '2rem' : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </h2>
        {children}
      </motion.div>
    </ScrollReveal>
  );
};

const ImageModal: React.FC<{
  image: { url: string; alt: string; caption?: string };
  onClose: () => void;
}> = ({ image, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="relative max-w-6xl w-full"
      onClick={e => e.stopPropagation()}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-auto rounded-lg"
      />
      {image.caption && (
        <p className="text-center text-zinc-400 mt-4">{image.caption}</p>
      )}
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors"
      >
        ×
      </button>
    </motion.div>
  </motion.div>
);

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link
            to="/projects"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 pt-32">
      <motion.div 
        style={{ opacity }}
        className="fixed inset-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"
          style={{
            maskImage: 'radial-gradient(circle at center, black, transparent)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent)'
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <ScrollReveal>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              <FuzzyText text={project.title} />
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              {project.shortDescription}
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Project Overview */}
        <Section title="Project Overview">
          <SpotlightCard className="p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Problem Statement</h3>
                <p className="text-zinc-400 leading-relaxed">{project.overview.problemStatement}</p>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'My Role', value: project.overview.role },
                  { label: 'Duration', value: project.overview.duration },
                  ...(project.overview.team ? [{ label: 'Team', value: project.overview.team }] : [])
                ].map(({ label, value }) => (
                  <div key={label} className="relative">
                    <h4 className="font-medium mb-2 text-zinc-300">{label}</h4>
                    <p className="text-zinc-400">{value}</p>
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-500/20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Section>

        {/* Technologies Used */}
        <Section title="Technologies Used" className="relative">
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TechnologyTag {...tech} />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -z-10" />
        </Section>

        {/* Key Features */}
        <Section title="Key Features">
          <div className="grid md:grid-cols-2 gap-8">
            {project.keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <SpotlightCard className="p-6 h-full hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-500">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Challenges & Solutions */}
        <Section title="Challenges & Solutions">
          {project.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <SpotlightCard className="p-6 mb-6 hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="text-blue-500">⚠️</span>
                      Challenge
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">{challenge.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Solution
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">{challenge.solution}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </Section>

        {/* Project Images */}
        <Section title="Project Visuals">
          <div className="grid gap-8">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-4"
              >
                <motion.div 
                  className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-lg">Click to enlarge</span>
                  </div>
                </motion.div>
                {image.caption && (
                  <p className="text-center text-zinc-400">{image.caption}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Project Links */}
        <Section title="Project Links">
          <div className="flex gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Site
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Source Code
              </motion.a>
            )}
          </div>
        </Section>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-16 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {project.prevProject ? (
            <motion.button
              onClick={() => navigate(`/projects/${project.prevProject}`)}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              whileHover={{ x: -5 }}
            >
              <span className="transition-transform group-hover:transform group-hover:-translate-x-2">←</span>
              <span>Previous Project</span>
            </motion.button>
          ) : (
            <div />
          )}
          
          <Link
            to="/projects"
            className="text-zinc-400 hover:text-white transition-colors hover:underline"
          >
            All Projects
          </Link>
          
          {project.nextProject ? (
            <motion.button
              onClick={() => navigate(`/projects/${project.nextProject}`)}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span>Next Project</span>
              <span className="transition-transform group-hover:transform group-hover:translate-x-2">→</span>
            </motion.button>
          ) : (
            <div />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 