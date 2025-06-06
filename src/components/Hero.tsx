import React from 'react';
import { motion } from 'framer-motion';
import { FuzzyText } from './animations/FuzzyText';
import { TypeAnimation } from 'react-type-animation';
import TrueFocus from './animations/TrueFocus';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/0 via-black/50 to-black"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
      />
      
      <motion.div
        className="relative z-10 text-center w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative flex flex-col items-center"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="absolute -left-4 right-4 h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"
            />
            <h1 className="text-6xl md:text-8xl font-bold text-white relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Biplove Yadav
              </span>
            </h1>
          </div>
          
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl mx-auto mb-8"
          >
            <TrueFocus
              sentence="Freelance Digital Professional"
              blurAmount={5}
              borderColor="#3b82f6"
              glowColor="rgba(59, 130, 246, 0.6)"
              animationDuration={0.6}
              pauseBetweenAnimations={2}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 h-20 flex items-center justify-center"
          >
            <TypeAnimation
              sequence={[
                'Front-End Development',
                2000,
                'Social Media Marketing',
                2000,
                'Video Editing & Graphics',
                2000,
                'E-commerce Management',
                2000,
                'IT Support & Solutions',
                2000,
              ]}
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-full font-medium transition-colors relative group overflow-hidden"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity"
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border border-white/30 text-white rounded-full font-medium transition-all relative group overflow-hidden hover:border-white/60"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full mx-auto"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 