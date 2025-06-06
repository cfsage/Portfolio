import React, { useEffect, useRef, useState, useMemo } from 'react';

interface CertificationImage {
  imageUrl: string;
  title?: string;
  altText?: string;
}

interface FlyingCertification extends CertificationImage {
  x: number;
  y: number;
  z: number;
  rotation: number;
  speed: number;
  scale: number;
  image: HTMLImageElement;
  loaded: boolean;
}

interface FlyingCertificationsProps {
  certificationImages: CertificationImage[];
  backgroundColor?: string;
  maxVisibleCertifications?: number;
  animationSpeed?: number;
  certBorderRadius?: string;
  certBorderColor?: string;
  certBorderWidth?: string;
  enableGlow?: boolean;
  glowColor?: string;
  imageAspectRatio?: number;
}

export const FlyingCertifications: React.FC<FlyingCertificationsProps> = ({
  certificationImages,
  backgroundColor = '#000000',
  maxVisibleCertifications = 20,
  animationSpeed = 1,
  certBorderColor = '#ffffff',
  certBorderWidth = '2px',
  enableGlow = false,
  glowColor = '#ffffff',
  imageAspectRatio = 4/3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const certificationsRef = useRef<FlyingCertification[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const lastFrameTimeRef = useRef<number>(0);
  const FPS = 60;
  const frameInterval = 1000 / FPS;

  // Adjust maxVisibleCertifications based on device performance
  const adjustedMaxCertifications = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const isLowPerfDevice = !window.requestAnimationFrame || navigator.hardwareConcurrency <= 2;
    return isMobile || isLowPerfDevice ? Math.min(10, maxVisibleCertifications) : maxVisibleCertifications;
  }, [maxVisibleCertifications]);

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      const loadedCertifications = await Promise.all(
        certificationImages.slice(0, adjustedMaxCertifications).map(async (cert) => {
          const image = new Image();
          image.src = cert.imageUrl;
          await new Promise((resolve) => {
            image.onload = resolve;
          });

          return {
            ...cert,
            x: Math.random() * canvasSize.width,
            y: Math.random() * canvasSize.height,
            z: Math.random() * 2 - 1, // -1 to 1 for depth
            rotation: Math.random() * Math.PI * 2,
            speed: (Math.random() * 0.5 + 0.5) * animationSpeed,
            scale: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
            image,
            loaded: true,
          };
        })
      );

      certificationsRef.current = loadedCertifications;
    };

    if (canvasSize.width > 0 && canvasSize.height > 0) {
      loadImages();
    }
  }, [certificationImages, adjustedMaxCertifications, canvasSize, animationSpeed]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && bufferCanvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        bufferCanvasRef.current.width = width * dpr;
        bufferCanvasRef.current.height = height * dpr;
        
        setCanvasSize({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const bufferCanvas = bufferCanvasRef.current;
    if (!canvas || !bufferCanvas) return;

    const ctx = canvas.getContext('2d');
    const bufferCtx = bufferCanvas.getContext('2d');
    if (!ctx || !bufferCtx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    bufferCtx.scale(dpr, dpr);

    const animate = (timestamp: number) => {
      // Throttle frame rate
      if (timestamp - lastFrameTimeRef.current < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }

      // Clear buffer canvas
      bufferCtx.fillStyle = backgroundColor;
      bufferCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      certificationsRef.current.forEach((cert) => {
        if (!cert.loaded) return;

        // Update position
        cert.x += Math.cos(cert.rotation) * cert.speed;
        cert.y += Math.sin(cert.rotation) * cert.speed;

        // Wrap around screen
        if (cert.x < -200) cert.x = canvasSize.width + 200;
        if (cert.x > canvasSize.width + 200) cert.x = -200;
        if (cert.y < -200) cert.y = canvasSize.height + 200;
        if (cert.y > canvasSize.height + 200) cert.y = -200;

        // Calculate size based on z-position
        const baseSize = Math.min(canvasSize.width, canvasSize.height) * 0.2;
        const size = baseSize * cert.scale * (1 + cert.z * 0.5);
        const width = size;
        const height = size / imageAspectRatio;

        bufferCtx.save();
        bufferCtx.translate(cert.x, cert.y);
        bufferCtx.rotate(cert.rotation);
        bufferCtx.scale(cert.scale, cert.scale);

        // Apply glow effect
        if (enableGlow) {
          bufferCtx.shadowColor = glowColor;
          bufferCtx.shadowBlur = 20;
        }

        // Draw border
        bufferCtx.strokeStyle = certBorderColor;
        bufferCtx.lineWidth = parseInt(certBorderWidth);
        bufferCtx.beginPath();
        bufferCtx.roundRect(-width/2, -height/2, width, height, 8);
        bufferCtx.stroke();

        // Draw image
        bufferCtx.clip();
        bufferCtx.drawImage(cert.image, -width/2, -height/2, width, height);

        bufferCtx.restore();
      });

      // Copy from buffer canvas to main canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      ctx.drawImage(bufferCanvas, 0, 0);

      lastFrameTimeRef.current = timestamp;
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [canvasSize, backgroundColor, enableGlow, glowColor, certBorderColor, certBorderWidth, imageAspectRatio]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: backgroundColor,
        }}
      />
    </div>
  );
}; 