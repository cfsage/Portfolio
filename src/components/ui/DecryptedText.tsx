import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrambleChars = useOriginalCharsOnly 
    ? [...new Set(text.split(''))].join('')
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  const startDecryption = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let iterations = 0;
    const targetText = text;
    let currentText = targetText.split('').map(() => getRandomChar()).join('');
    
    setDisplayText(currentText);

    intervalRef.current = setInterval(() => {
      if (sequential) {
        // Sequential reveal
        const revealCount = Math.floor((iterations / maxIterations) * targetText.length);
        let newText = '';
        
        for (let i = 0; i < targetText.length; i++) {
          if (revealDirection === 'start' && i < revealCount) {
            newText += targetText[i];
          } else if (revealDirection === 'end' && i >= targetText.length - revealCount) {
            newText += targetText[i];
          } else if (revealDirection === 'center') {
            const centerIndex = Math.floor(targetText.length / 2);
            const distance = Math.abs(i - centerIndex);
            if (distance < revealCount / 2) {
              newText += targetText[i];
            } else {
              newText += getRandomChar();
            }
          } else {
            newText += getRandomChar();
          }
        }
        
        setDisplayText(newText);
      } else {
        // Random reveal
        const newText = targetText
          .split('')
          .map((char, index) => {
            if (Math.random() < iterations / maxIterations) {
              return char;
            }
            return getRandomChar();
          })
          .join('');
        
        setDisplayText(newText);
      }

      iterations++;

      if (iterations >= maxIterations) {
        setDisplayText(targetText);
        setIsAnimating(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view' && isInView && !isAnimating) {
      startDecryption();
    }
  }, [isInView, animateOn]);

  useEffect(() => {
    if (animateOn === 'hover' && isHovered && !isAnimating) {
      startDecryption();
    }
  }, [isHovered, animateOn]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovered(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsAnimating(false);
      setDisplayText(text);
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`${parentClassName} font-mono`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`${className} ${isAnimating ? encryptedClassName : ''}`}>
        {displayText}
      </span>
    </motion.span>
  );
};

export default DecryptedText;