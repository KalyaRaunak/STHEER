import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'h-16 md:h-18 bg-brand-black/92 backdrop-blur-md border-b border-brand-border'
            : 'h-16 md:h-[72px] bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] h-full mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center">
            <Logo variant="white" />
          </Link>

          {/* Centre: Nav links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-dm-sans font-medium text-[15px] transition-colors duration-200 hover:text-brand-yellow ${
                  isActive(link.path) ? 'text-brand-yellow' : 'text-brand-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-block bg-brand-yellow hover:bg-brand-gold text-brand-black font-montserrat font-bold text-xs uppercase tracking-[0.08em] px-5 py-2.5 rounded-[2px] transition-all duration-200 hover:-translate-y-[1px] shadow-sm active:translate-y-0"
            >
              Book Strategy Call
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-white hover:text-brand-yellow p-1 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black transition-all duration-500 ease-[0.25,0.1,0.25,1] flex flex-col justify-center px-10 md:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Mobile Nav Links stacked */}
        <div className="flex flex-col gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-montserrat font-bold text-4xl tracking-tight transition-all duration-300 hover:text-brand-yellow ${
                isActive(link.path) ? 'text-brand-yellow' : 'text-brand-white'
              }`}
              style={{
                transitionDelay: isOpen ? `${idx * 75}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div
          className="mt-12 transition-all duration-500"
          style={{
            transitionDelay: isOpen ? `${navLinks.length * 75}ms` : '0ms',
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <Link
            to="/contact"
            className="inline-block w-full text-center bg-brand-yellow hover:bg-brand-gold text-brand-black font-montserrat font-bold text-sm uppercase tracking-[0.08em] py-4 rounded-[2px] transition-all"
          >
            Book Strategy Call
          </Link>
        </div>
      </div>
      {/* Scroll progress bar — thin yellow line at very top */}
      <motion.div
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          backgroundColor: '#FFD700',
          zIndex: 101,
          width: `${scrollProgress}%`,
          transformOrigin: 'left',
          transition: 'width 100ms linear'
        }}
      />
    </>
  );
};

export default Navbar;
