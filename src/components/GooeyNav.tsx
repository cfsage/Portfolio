import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GooeyNav.css';

interface GooeyNavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items = [],
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4]
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const navigate = useNavigate();
  const location = useLocation();

  const createParticles = useCallback((fromEl: HTMLElement, toEl: HTMLElement) => {
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const particles: HTMLElement[] = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const point = document.createElement('div');
      point.className = 'point';
      particle.appendChild(point);
      container.appendChild(particle);
      particles.push(particle);

      const angle = (Math.PI * 2 * i) / particleCount;
      const variance = Math.random() * timeVariance;
      const [outer, inner] = particleDistances;
      const rotation = Math.random() * particleR;

      particle.style.setProperty('--start-x', `${fromRect.left + fromRect.width / 2}px`);
      particle.style.setProperty('--start-y', `${fromRect.top + fromRect.height / 2}px`);
      particle.style.setProperty('--end-x', `${toRect.left + toRect.width / 2}px`);
      particle.style.setProperty('--end-y', `${toRect.top + toRect.height / 2}px`);
      particle.style.setProperty('--angle', `${angle}rad`);
      particle.style.setProperty('--outer-distance', `${outer}px`);
      particle.style.setProperty('--inner-distance', `${inner}px`);
      particle.style.setProperty('--rotation', `${rotation}deg`);
      particle.style.setProperty('--color-index', colors[i % colors.length].toString());
      particle.style.setProperty('--animation-time', `${animationTime + variance}ms`);
    }

    setTimeout(() => {
      container.remove();
    }, animationTime + timeVariance);
  }, [particleCount, particleDistances, particleR, animationTime, timeVariance, colors]);

  useEffect(() => {
    const currentIndex = items.findIndex(item => item.href === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, items]);

  const handleClick = (index: number, href: string, event: React.MouseEvent<HTMLLIElement>) => {
    const fromEl = event.currentTarget;
    const toEl = event.currentTarget.parentElement?.children[index] as HTMLElement;
    if (fromEl && toEl) {
      createParticles(fromEl, toEl);
    }
    setActiveIndex(index);
    navigate(href);
  };

  return (
    <div className="gooey-nav-container">
      <nav>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={(e) => handleClick(index, item.href, e)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="effect filter" />
      <div className="effect text" />
    </div>
  );
};

export default GooeyNav;