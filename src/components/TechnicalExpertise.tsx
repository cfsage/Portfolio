import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './animations/ScrollReveal';
import { skills, certifications } from '@/data/skills';
import { certificationImages } from '@/data/certificationImages';
import { FlyingCertifications } from './animations/FlyingCertifications';

interface SkillCardProps {
  icon: React.ElementType;
  name: string;
  color?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, name, color = 'text-white' }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative flex items-center gap-3 p-4 bg-zinc-900/50 rounded-xl backdrop-blur-sm border border-zinc-800/50"
  >
    <Icon className={`text-2xl ${color}`} />
    <span className="font-medium">{name}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity rounded-xl" />
  </motion.div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-2xl font-bold mb-8"
  >
    {children}
  </motion.h2>
);

const CertificationCard: React.FC<{
  title: string;
  issuer: string;
  date: string;
  icon: React.ElementType;
  color: string;
  isLeft?: boolean;
}> = ({ title, issuer, date, icon: Icon, color, isLeft = true }) => (
  <div className={`flex items-center gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`w-1/2 p-4 rounded-lg bg-zinc-900/50 backdrop-blur-sm ${isLeft ? 'text-left' : 'text-right'}`}
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-zinc-400">{issuer}</p>
      <p className="text-sm text-zinc-500">{date}</p>
    </motion.div>
    <div className="relative">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} bg-zinc-900/50`}>
        <Icon className="text-2xl" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 w-6 h-px bg-zinc-700" style={{
        left: isLeft ? '-24px' : 'auto',
        right: isLeft ? 'auto' : '-24px'
      }} />
    </div>
  </div>
);

export const TechnicalExpertise = () => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryTitles = {
    development: 'Development',
    design: 'Design & Video',
    it: 'IT & Systems',
    tools: 'Collaboration Tools'
  };

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black" id="skills">
      <div className="max-w-6xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Technical <span className="text-blue-500">Expertise</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <ScrollReveal key={category}>
              <div>
                <SectionTitle>{categoryTitles[category as keyof typeof categoryTitles]}</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill.name}
                      icon={skill.icon}
                      name={skill.name}
                      color={skill.color}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h3 className="text-2xl font-bold text-center mb-12">
            Certifications & <span className="text-blue-500">Achievements</span>
          </h3>
        </ScrollReveal>

        <div className="mb-20 h-[400px]">
          <FlyingCertifications
            certificationImages={certificationImages}
            backgroundColor="transparent"
            maxVisibleCertifications={12}
            animationSpeed={0.5}
            certBorderColor="rgba(59, 130, 246, 0.5)"
            certBorderWidth="2px"
            enableGlow={true}
            glowColor="rgba(59, 130, 246, 0.3)"
            imageAspectRatio={4/3}
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800" />
          <div className="space-y-12">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.title}
                {...cert}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 