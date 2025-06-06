import React, { useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface Thread {
  points: { x: number; y: number; }[];
  velocity: { x: number; y: number; };
  length: number;
  width: number;
  color: string;
  alpha: number;
  seed: number;
}

interface ThreadsBackgroundProps {
  threadCount?: number;
  threadColors?: string[];
  threadWidth?: number;
  speed?: number;
  backgroundColor?: string;
  mouseInteraction?: boolean;
  interactionRadius?: number;
  className?: string;
}

export const ThreadsBackground = ({
  threadCount = 50,
  threadColors = ['#3b82f6', '#60a5fa', '#93c5fd'], // blue shades
  threadWidth = 1,
  speed = 0.5,
  backgroundColor = 'transparent',
  mouseInteraction = true,
  interactionRadius = 150,
  className,
}: ThreadsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const threadsRef = useRef<Thread[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const FPS = 60;
  const frameInterval = 1000 / FPS;

  // Adjust thread count based on device performance
  const adjustedThreadCount = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const isLowPerfDevice = !window.requestAnimationFrame || navigator.hardwareConcurrency <= 2;
    return isMobile || isLowPerfDevice ? Math.floor(threadCount / 2) : threadCount;
  }, [threadCount]);

  // Perlin noise implementation for organic movement
  const noise = useMemo(() => {
    const permutation = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    const p = [...permutation, ...permutation];

    return (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const A = p[X] + Y;
      const B = p[X + 1] + Y;
      return lerp(v,
        lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
        lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1))
      );
    };
  }, []);

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  const createThread = (width: number, height: number): Thread => {
    const points = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height
    }));
    
    return {
      points,
      velocity: {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed
      },
      length: Math.random() * 100 + 50,
      width: Math.random() * threadWidth + 1,
      color: threadColors[Math.floor(Math.random() * threadColors.length)],
      alpha: Math.random() * 0.5 + 0.5,
      seed: Math.random() * 1000
    };
  };

  const updateThread = (thread: Thread, width: number, height: number, time: number) => {
    thread.points.forEach((point, i) => {
      const noiseX = noise(point.x * 0.005 + thread.seed, time * 0.001) * 2;
      const noiseY = noise(point.y * 0.005 + thread.seed, time * 0.001) * 2;
      
      point.x += thread.velocity.x + noiseX;
      point.y += thread.velocity.y + noiseY;

      // Mouse interaction
      if (mouseInteraction) {
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < interactionRadius) {
          const force = (1 - distance / interactionRadius) * 2;
          point.x -= dx * force * 0.01;
          point.y -= dy * force * 0.01;
        }
      }

      // Wrap around screen
      if (point.x < 0) point.x = width;
      if (point.x > width) point.x = 0;
      if (point.y < 0) point.y = height;
      if (point.y > height) point.y = 0;
    });
  };

  const drawThread = (ctx: CanvasRenderingContext2D, thread: Thread) => {
    ctx.beginPath();
    ctx.moveTo(thread.points[0].x, thread.points[0].y);
    
    for (let i = 1; i < thread.points.length - 2; i++) {
      const xc = (thread.points[i].x + thread.points[i + 1].x) / 2;
      const yc = (thread.points[i].y + thread.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(thread.points[i].x, thread.points[i].y, xc, yc);
    }
    
    ctx.quadraticCurveTo(
      thread.points[thread.points.length - 2].x,
      thread.points[thread.points.length - 2].y,
      thread.points[thread.points.length - 1].x,
      thread.points[thread.points.length - 1].y
    );

    ctx.strokeStyle = `rgba(${hexToRgb(thread.color)}, ${thread.alpha})`;
    ctx.lineWidth = thread.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '255, 255, 255';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    if (!canvas || !bufferCanvas) return;

    const ctx = canvas.getContext('2d');
    const bufferCtx = bufferCanvas.getContext('2d');
    if (!ctx || !bufferCtx) return;

    const handleResize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      bufferCanvas.width = width * dpr;
      bufferCanvas.height = height * dpr;
      bufferCtx.scale(dpr, dpr);
      
      // Initialize threads
      threadsRef.current = Array.from(
        { length: adjustedThreadCount },
        () => createThread(width, height)
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = (time: number) => {
      // Throttle frame rate
      if (time - lastFrameTimeRef.current < frameInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const { width, height } = canvas.getBoundingClientRect();
      
      // Clear and draw on buffer canvas
      bufferCtx.fillStyle = backgroundColor;
      bufferCtx.fillRect(0, 0, width, height);
      
      threadsRef.current.forEach(thread => {
        updateThread(thread, width, height, time);
        drawThread(bufferCtx, thread);
      });
      
      // Copy from buffer canvas to main canvas
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bufferCanvas, 0, 0);

      lastFrameTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [adjustedThreadCount, threadColors, threadWidth, speed, backgroundColor, mouseInteraction, interactionRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-10", className)}
      style={{ background: backgroundColor }}
    />
  );
}; 