import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundEffects } from './components/animations/BackgroundEffects';
import { PageTransition } from './components/animations/PageTransition';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { TechnicalExpertise } from '@/components/TechnicalExpertise';
import GooeyNav from './components/GooeyNav';

// Lazy load route components
const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Blog = React.lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));

const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center justify-center min-h-[400px] bg-black/50 backdrop-blur-sm"
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
    />
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" }
];

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <ErrorBoundary>
              <Hero />
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary>
                  <About />
                  <TechnicalExpertise />
                  <Projects />
                  <Testimonials />
                  <Contact />
                </ErrorBoundary>
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <About />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Projects />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="/projects/:projectId" element={
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetail />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <ErrorBoundary>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-zinc-400 mb-8">The page you're looking for doesn't exist.</p>
                  <Button asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            </ErrorBoundary>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <BackgroundEffects />
        <div className="relative min-h-screen">
          <div className="fixed top-4 left-0 right-0 z-50" style={{ height: '60px' }}>
            <GooeyNav
              items={navItems.map(item => ({ ...item, href: item.path }))}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={["#3b82f6", "#60a5fa", "#93c5fd", "#3b82f6", "#60a5fa", "#93c5fd", "#3b82f6", "#ffffff"]}
            />
          </div>
          <ScrollToTop />
          <AnimatedRoutes />
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
