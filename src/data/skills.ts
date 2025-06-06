import { IconType } from 'react-icons';
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaWindows,
  FaGoogle,
  FaAws,
  FaLinkedin,
  FaMicrosoft,
} from 'react-icons/fa';
import { 
  SiJavascript,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiDavinciresolve,
  SiMeta,
  SiGooglecloud,
  SiAib as SiIbm,
  SiMagento,
  SiZoom,
  SiGooglemeet,
  SiTryhackme,
} from 'react-icons/si';

export interface Skill {
  name: string;
  icon: IconType;
  color?: string;
  category: 'development' | 'design' | 'marketing' | 'it' | 'tools';
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: IconType;
  color: string;
  link?: string;
}

export const skills: Skill[] = [
  // Development & Design
  {
    name: 'HTML5',
    icon: FaHtml5,
    color: 'text-orange-500',
    category: 'development'
  },
  {
    name: 'CSS3',
    icon: FaCss3Alt,
    color: 'text-blue-500',
    category: 'development'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: 'text-yellow-400',
    category: 'development'
  },
  {
    name: 'React',
    icon: FaReact,
    color: 'text-cyan-400',
    category: 'development'
  },
  {
    name: 'Git',
    icon: FaGitAlt,
    color: 'text-orange-600',
    category: 'development'
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    color: 'text-white',
    category: 'development'
  },
  // Design & Video
  {
    name: 'Premiere Pro',
    icon: SiAdobepremierepro,
    color: 'text-purple-500',
    category: 'design'
  },
  {
    name: 'After Effects',
    icon: SiAdobeaftereffects,
    color: 'text-purple-600',
    category: 'design'
  },
  {
    name: 'Photoshop',
    icon: SiAdobephotoshop,
    color: 'text-blue-600',
    category: 'design'
  },
  {
    name: 'DaVinci Resolve',
    icon: SiDavinciresolve,
    color: 'text-orange-500',
    category: 'design'
  },
  // IT & Systems
  {
    name: 'Linux',
    icon: FaLinux,
    color: 'text-yellow-200',
    category: 'it'
  },
  {
    name: 'Windows',
    icon: FaWindows,
    color: 'text-blue-500',
    category: 'it'
  },
  {
    name: 'AWS',
    icon: FaAws,
    color: 'text-yellow-500',
    category: 'it'
  },
  {
    name: 'Magento',
    icon: SiMagento,
    color: 'text-orange-500',
    category: 'it'
  },
  // Collaboration Tools
  {
    name: 'Zoom',
    icon: SiZoom,
    color: 'text-blue-500',
    category: 'tools'
  },
  {
    name: 'Teams',
    icon: FaMicrosoft,
    color: 'text-blue-600',
    category: 'tools'
  },
  {
    name: 'Meet',
    icon: SiGooglemeet,
    color: 'text-green-500',
    category: 'tools'
  }
];

export const certifications: Certification[] = [
  {
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta',
    date: 'June 2023',
    icon: SiMeta,
    color: 'text-blue-500'
  },
  {
    title: 'Meta Social Media Marketing Specialization',
    issuer: 'Meta',
    date: 'November 2023',
    icon: SiMeta,
    color: 'text-blue-500'
  },
  {
    title: 'Google IT Support Specialization',
    issuer: 'Google',
    date: 'September 2024',
    icon: FaGoogle,
    color: 'text-red-500'
  },
  {
    title: 'TryHackMe: Advent of Cyber 2024',
    issuer: 'TryHackMe',
    date: 'December 2024',
    icon: SiTryhackme,
    color: 'text-red-600'
  },
  {
    title: 'Google Cloud: Custom Network & Firewall',
    issuer: 'Google Cloud',
    date: 'October 2024',
    icon: SiGooglecloud,
    color: 'text-blue-400'
  },
  {
    title: 'IBM: Software Engineering Foundations',
    issuer: 'IBM',
    date: 'October 2024',
    icon: SiIbm,
    color: 'text-blue-600'
  },
  {
    title: 'IBM: Cybersecurity Careers',
    issuer: 'IBM',
    date: 'October 2024',
    icon: SiIbm,
    color: 'text-blue-600'
  },
  {
    title: 'Google: Project Management Foundations',
    issuer: 'Google',
    date: 'September 2024',
    icon: FaGoogle,
    color: 'text-red-500'
  }
]; 