import React, { useEffect, useRef, useMemo } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  color: string;
  size: number;
  speed: number;
}

export const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(15);
  const frameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const FPS = 60;
  const frameInterval = 1000 / FPS;

  // Cyberpunk theme configuration
  const THEME = useMemo(() => ({
    background: '#000000',
    neonPink: ['#ff1493', '#ff69b4', '#ff00ff'],
    neonBlue: ['#00ffff', '#1e90ff', '#00bfff'],
    roadColor: '#0a0a0f',
    shoulderLines: '#1a1a2e',
  }), []);

  const STAR_COUNT = useMemo(() => {
    // Adjust star count based on device performance
    const isMobile = window.innerWidth <= 768;
    const isLowPerfDevice = !window.requestAnimationFrame || navigator.hardwareConcurrency <= 2;
    return isMobile || isLowPerfDevice ? 100 : 200;
  }, []);

  const MAX_DEPTH = 1000;
  const PERSPECTIVE = 100;
  const STAR_COLORS = useMemo(() => [...THEME.neonPink, ...THEME.neonBlue], [THEME]);

  const createStars = (width: number, height: number): Star[] => {
    return Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * MAX_DEPTH,
      prevZ: 0,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.75
    }));
  };

  const moveStars = (stars: Star[], baseSpeed: number) => {
    stars.forEach(star => {
      star.prevZ = star.z;
      star.z = star.z - baseSpeed * star.speed;
      
      if (star.z <= 1) {
        star.z = MAX_DEPTH;
        star.prevZ = star.z;
        star.x = (Math.random() - 0.5) * 2000;
        star.y = (Math.random() - 0.5) * 1000;
      }
    });
  };

  const drawRoad = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const roadWidth = width * 0.8;
    const x = (width - roadWidth) / 2;
    
    ctx.fillStyle = THEME.roadColor;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + roadWidth, 0);
    ctx.lineTo(x + roadWidth * 0.6, height);
    ctx.lineTo(x + roadWidth * 0.4, height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = THEME.shoulderLines;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + roadWidth * 0.4, height);
    ctx.moveTo(x + roadWidth, 0);
    ctx.lineTo(x + roadWidth * 0.6, height);
    ctx.stroke();
  };

  const getColorWithOpacity = (color: string, opacity: number): string => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const bufferCtx = bufferCanvas.getContext('2d', { alpha: false });
    if (!ctx || !bufferCtx) return;

    const dpr = window.devicePixelRatio || 1;
    let rafId: number;
    
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      bufferCanvas.width = width * dpr;
      bufferCanvas.height = height * dpr;
      bufferCtx.scale(dpr, dpr);
      
      starsRef.current = createStars(width, height);
    };

    const render = (timestamp: number) => {
      // Throttle frame rate
      if (timestamp - lastFrameTimeRef.current < frameInterval) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear and draw on buffer canvas
      bufferCtx.fillStyle = THEME.background;
      bufferCtx.fillRect(0, 0, width, height);

      drawRoad(bufferCtx, width, height);
      moveStars(starsRef.current, speedRef.current);

      bufferCtx.globalCompositeOperation = 'lighter';
      
      starsRef.current.forEach(star => {
        const sx = centerX + (star.x / star.z) * PERSPECTIVE;
        const sy = centerY + (star.y / star.z) * PERSPECTIVE;
        const px = centerX + (star.x / star.prevZ) * PERSPECTIVE;
        const py = centerY + (star.y / star.prevZ) * PERSPECTIVE;

        const scale = (1 - star.z / MAX_DEPTH);
        const alpha = Math.min(1, scale * 2);
        
        bufferCtx.save();
        bufferCtx.shadowBlur = 20;
        bufferCtx.shadowColor = getColorWithOpacity(star.color, alpha * 0.7);
        
        const gradient = bufferCtx.createLinearGradient(px, py, sx, sy);
        gradient.addColorStop(0, getColorWithOpacity(star.color, 0));
        gradient.addColorStop(0.1, getColorWithOpacity(star.color, alpha * 0.5));
        gradient.addColorStop(1, getColorWithOpacity(star.color, alpha));

        bufferCtx.beginPath();
        bufferCtx.strokeStyle = gradient;
        bufferCtx.lineWidth = scale * star.size * 4;
        bufferCtx.lineCap = 'round';
        bufferCtx.moveTo(px, py);
        bufferCtx.lineTo(sx, sy);
        bufferCtx.stroke();

        bufferCtx.beginPath();
        bufferCtx.arc(sx, sy, scale * star.size * 2, 0, Math.PI * 2);
        bufferCtx.fillStyle = getColorWithOpacity(star.color, alpha);
        bufferCtx.fill();
        
        bufferCtx.restore();
      });

      bufferCtx.globalCompositeOperation = 'source-over';

      // Copy from buffer canvas to main canvas
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bufferCanvas, 0, 0);

      lastFrameTimeRef.current = timestamp;
      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      speedRef.current = 10 + mouseX * 25;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [THEME, STAR_COLORS, STAR_COUNT]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-zinc-900 to-black"
    />
  );
}; 