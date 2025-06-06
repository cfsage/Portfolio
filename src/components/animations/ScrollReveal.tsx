'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!hasAnimated) {
              setTimeout(() => {
                if (elementRef.current) {
                  elementRef.current.classList.add('animate-in');
                  setHasAnimated(true);
                }
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, hasAnimated]);

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  };

  return (
    <motion.div
      ref={elementRef}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out',
        directionClasses[direction],
        isVisible && 'opacity-100 translate-x-0 translate-y-0',
        className
      )}
      initial={false}
    >
      {children}
    </motion.div>
  );
}; 