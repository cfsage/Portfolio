'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FuzzyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const FuzzyText = ({
  text,
  className,
  speed = 50,
}: FuzzyTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = useRef(text);
  const isHovered = useRef(false);

  useEffect(() => {
    originalText.current = text;
    setDisplayText(text);
  }, [text]);

  const startFuzzing = () => {
    isHovered.current = true;
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(originalText.current);
        return;
      }

      const fuzzedText = originalText.current
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          return Math.random() > 0.7
            ? characters[Math.floor(Math.random() * characters.length)]
            : char;
        })
        .join('');

      setDisplayText(fuzzedText);
    }, speed);
  };

  const stopFuzzing = () => {
    isHovered.current = false;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      className={cn('inline-block cursor-default', className)}
      onMouseEnter={startFuzzing}
      onMouseLeave={stopFuzzing}
    >
      {displayText}
    </span>
  );
}; 