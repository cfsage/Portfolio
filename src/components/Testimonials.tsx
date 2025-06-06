import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './animations/ScrollReveal';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    content: 'Working with this developer was an absolute pleasure. Their attention to detail and technical expertise helped us create an outstanding web application that exceeded our expectations.',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager at InnovateCo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    content: 'The level of professionalism and technical skill demonstrated throughout our project was exceptional. They delivered a beautiful, performant solution right on schedule.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Director at CreativeHub',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    content: 'Their ability to translate our design vision into a fully functional website while maintaining perfect attention to detail was impressive. A true professional who delivers excellence.',
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black" id="testimonials">
      <div className="max-w-6xl mx-auto px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16">
            Client <span className="text-blue-500">Testimonials</span>
          </h2>
        </ScrollReveal>

        <div className="relative h-[400px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
                  </div>

                  <blockquote className="text-xl text-zinc-300 mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-zinc-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-zinc-900/50 backdrop-blur-sm text-white pointer-events-auto"
              onClick={() => paginate(-1)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-zinc-900/50 backdrop-blur-sm text-white pointer-events-auto"
              onClick={() => paginate(1)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const direction = index > currentIndex ? 1 : -1;
                  setDirection(direction);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-500 w-4' : 'bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 