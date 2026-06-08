import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Scroll Reset & Scroll To Top
import { ScrollReset } from './components/layout/ScrollReset';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { PageTransition } from './components/layout/PageTransition';

// Lenis library helpers
import { initLenis, destroyLenis } from './lib/lenis';

// Lazy load all pages — each becomes its own chunk
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));

// Minimal loading fallback — blank dark screen (avoids flash)
const PageLoader: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0F0F0F'
    }} />
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        {/* Fallback route redirecting to Home */}
        <Route
          path="*"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    // Initialise Lenis global smooth scrolling
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  return (
    <Router>
      <ScrollReset />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex flex-col flex-grow w-full">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
