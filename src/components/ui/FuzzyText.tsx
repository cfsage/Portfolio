import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = "clamp(2rem, 8vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const intensity = isHovered && enableHover ? hoverIntensity : baseIntensity;
  const blur = intensity * 10;
  const spread = intensity * 5;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        color
      }}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="relative z-10"
        style={{
          textShadow: `
            0 0 ${blur}px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')},
            ${spread}px ${spread}px ${blur * 2}px rgba(0,0,0,0.3),
            -${spread}px -${spread}px ${blur * 2}px rgba(255,255,255,0.1)
          `
        }}
      >
        {children}
      </span>
      
      {/* Animated fuzzy background layers */}
      <motion.span
        className="absolute inset-0 z-0"
        style={{
          color,
          filter: `blur(${blur * 0.5}px)`,
          opacity: intensity * 0.7
        }}
        animate={{
          x: [0, 1, -1, 0],
          y: [0, -1, 1, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        key={`layer1-${animationKey}`}
      >
        {children}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 z-0"
        style={{
          color,
          filter: `blur(${blur}px)`,
          opacity: intensity * 0.5
        }}
        animate={{
          x: [0, -1, 1, 0],
          y: [0, 1, -1, 0]
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        key={`layer2-${animationKey}`}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default FuzzyText;