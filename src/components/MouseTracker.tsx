
import React, { useState, useEffect, useRef } from 'react';

interface DotParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  lifespan: number;
  startTime: number;
}

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState<DotParticle[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    const updatePositions = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY + window.scrollY });
      if (Math.random() > 0.6) {
        const newDot: DotParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + window.scrollY + (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 2,
          opacity: 1,
          lifespan: Math.random() * 1500 + 500,
          startTime: Date.now()
        };
        setDots(prevDots => [...prevDots, newDot]);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (Math.random() > 0.3) {
        const newDot: DotParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.scrollY + (Math.random() * window.innerHeight),
          size: Math.random() * 4 + 2,
          opacity: 1,
          lifespan: Math.random() * 1500 + 500,
          startTime: Date.now()
        };
        setDots(prevDots => [...prevDots, newDot]);
      }
    };

    window.addEventListener('mousemove', updatePositions);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', updatePositions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      
      setDots(prevDots => 
        prevDots
          .filter(dot => currentTime - dot.startTime < dot.lifespan)
          .map(dot => {
            const elapsed = currentTime - dot.startTime;
            const progress = elapsed / dot.lifespan;
            return {
              ...dot,
              opacity: 1 - progress,
              y: dot.y - 0.5
            };
          })
      );
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-3 h-3 bg-white/40 rounded-full pointer-events-none backdrop-blur-sm z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-plus-lighter"
        style={{
          left: `${position.x}px`,
          top: `${position.y - scrollY}px`,
          transition: 'transform 0.05s linear, opacity 0.05s linear',
          boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.5)'
        }}
      />
      
      {/* Dot dust effect */}
      {dots.map(dot => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-40 rounded-full bg-white"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y - scrollY}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transition: 'transform 0.2s ease-out'
          }}
        />
      ))}
    </>
  );
};

export default MouseTracker;
