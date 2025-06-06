import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: React.ReactNode;
  glitchOnHover?: boolean;
  glitchOnLoad?: boolean;
  duration?: number;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  glitchOnHover = true,
  glitchOnLoad = false,
  duration = 0.6,
  intensity = 1,
  className = '',
  style = {}
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (glitchOnLoad) {
      setIsGlitching(true);
      timeoutRef.current = setTimeout(() => {
        setIsGlitching(false);
      }, duration * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [glitchOnLoad, duration]);

  const triggerGlitch = () => {
    if (!glitchOnHover || isGlitching) return;
    
    setIsGlitching(true);
    setAnimationKey(prev => prev + 1);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
    }, duration * 1000);
  };

  const glitchVariants = {
    normal: {
      x: 0,
      y: 0,
      skewX: 0,
      filter: 'hue-rotate(0deg)'
    },
    glitch: {
      x: [0, -2 * intensity, 2 * intensity, -1 * intensity, 1 * intensity, 0],
      y: [0, 1 * intensity, -1 * intensity, 2 * intensity, -2 * intensity, 0],
      skewX: [0, -2 * intensity, 2 * intensity, -1 * intensity, 0],
      filter: [
        'hue-rotate(0deg)',
        `hue-rotate(${90 * intensity}deg)`,
        `hue-rotate(${-90 * intensity}deg)`,
        `hue-rotate(${45 * intensity}deg)`,
        'hue-rotate(0deg)'
      ],
      transition: {
        duration: duration,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{
        ...style,
        cursor: glitchOnHover ? 'pointer' : 'default'
      }}
      onMouseEnter={triggerGlitch}
      variants={glitchVariants}
      animate={isGlitching ? 'glitch' : 'normal'}
      key={animationKey}
    >
      {/* Main text */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 z-0"
            style={{
              color: '#ff0000',
              mixBlendMode: 'multiply'
            }}
            animate={{
              x: [-1 * intensity, 1 * intensity, -2 * intensity, 0],
              opacity: [0.7, 0.9, 0.5, 0.8]
            }}
            transition={{
              duration: duration * 0.3,
              repeat: Math.floor(duration * 3),
              repeatType: 'reverse'
            }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 z-0"
            style={{
              color: '#00ff00',
              mixBlendMode: 'multiply'
            }}
            animate={{
              x: [1 * intensity, -1 * intensity, 2 * intensity, 0],
              opacity: [0.5, 0.8, 0.6, 0.7]
            }}
            transition={{
              duration: duration * 0.4,
              repeat: Math.floor(duration * 2.5),
              repeatType: 'reverse'
            }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 z-0"
            style={{
              color: '#0000ff',
              mixBlendMode: 'multiply'
            }}
            animate={{
              x: [0, -2 * intensity, 1 * intensity, 0],
              opacity: [0.6, 0.4, 0.9, 0.5]
            }}
            transition={{
              duration: duration * 0.5,
              repeat: Math.floor(duration * 2),
              repeatType: 'reverse'
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.div>
  );
};

export default GlitchText;