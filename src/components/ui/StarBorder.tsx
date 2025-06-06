import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  starCount?: number;
  starSize?: number;
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

const StarBorder: React.FC<StarBorderProps> = ({
  children,
  className = '',
  speed = 2,
  starCount = 20,
  starSize = 2,
  color = '#ffffff',
  as: Component = 'div',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; progress: number }>>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const perimeter = 2 * (dimensions.width + dimensions.height);
    const spacing = perimeter / starCount;

    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      progress: (i * spacing) / perimeter
    }));

    setStars(newStars);
  }, [dimensions, starCount]);

  const getPositionFromProgress = (progress: number) => {
    const { width, height } = dimensions;
    const perimeter = 2 * (width + height);
    const distance = (progress * perimeter) % perimeter;

    if (distance <= width) {
      // Top edge
      return { x: distance, y: 0 };
    } else if (distance <= width + height) {
      // Right edge
      return { x: width, y: distance - width };
    } else if (distance <= 2 * width + height) {
      // Bottom edge
      return { x: width - (distance - width - height), y: height };
    } else {
      // Left edge
      return { x: 0, y: height - (distance - 2 * width - height) };
    }
  };

  useEffect(() => {
    if (stars.length === 0) return;

    const interval = setInterval(() => {
      setStars(prevStars =>
        prevStars.map(star => ({
          ...star,
          progress: (star.progress + speed / 1000) % 1
        }))
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [stars.length, speed]);

  return (
    <Component
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        ...style,
        border: '1px solid transparent'
      }}
    >
      {children}
      
      {/* Star particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map(star => {
          const position = getPositionFromProgress(star.progress);
          return (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: position.x - starSize / 2,
                top: position.y - starSize / 2,
                width: starSize,
                height: starSize,
                backgroundColor: color,
                borderRadius: '50%',
                boxShadow: `0 0 ${starSize * 2}px ${color}`,
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          );
        })}
      </div>
      
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
          borderRadius: 'inherit'
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </Component>
  );
};

export default StarBorder;