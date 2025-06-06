import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  delay?: number;
  stepDuration?: number;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  animateBy = 'words',
  direction = 'top',
  delay = 200,
  stepDuration = 0.35,
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin });
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    if (isInView && !animationCompleted) {
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
        onAnimationComplete?.();
      }, elements.length * delay + stepDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, animationCompleted, elements.length, delay, stepDuration, onAnimationComplete]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: direction === 'top' ? -20 : 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: stepDuration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className={animateBy === 'words' ? 'inline-block mr-2' : 'inline-block'}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;