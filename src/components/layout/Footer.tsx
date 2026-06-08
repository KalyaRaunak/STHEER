import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-brand-border pt-16 pb-8 px-6 md:px-8 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/">
              <Logo variant="white" />
            </Link>
            <p className="font-dm-sans font-regular text-[15px] text-brand-off-white/80 leading-relaxed max-w-[280px]">
              Digital growth infrastructure for businesses that want to scale with clarity and control.
            </p>
            <p className="font-montserrat font-bold text-xs uppercase tracking-[0.08em] text-brand-yellow">
              We only grow if you grow.
            </p>
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-surface/60 border border-brand-border px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-dm-sans font-medium text-[11px] text-brand-off-white tracking-[0.04em] uppercase">
                Currently Accepting New Clients
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-montserrat font-bold text-xs text-brand-white uppercase tracking-[0.12em] mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                'Websites & Systems',
                'Digital Growth',
                'Social Media Management',
                'Software & SaaS',
                'CRM Systems',
                'AI & Automation',
                'Design Services',
                'Standee Design',
                'Flyer & Vinyl Design',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="font-dm-sans text-sm text-brand-muted hover:text-brand-yellow transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-montserrat font-bold text-xs text-brand-white uppercase tracking-[0.12em] mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Our Story', path: '/about' },
                { name: 'Portfolio', path: '/work' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-dm-sans text-sm text-brand-muted hover:text-brand-yellow transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-montserrat font-bold text-xs text-brand-white uppercase tracking-[0.12em] mb-6">
                Connect
              </h4>
              <a
                href="mailto:info@stheer.co.uk"
                className="font-dm-sans text-base text-brand-white hover:text-brand-yellow border-b border-transparent hover:border-brand-yellow transition-all duration-200 pb-0.5"
              >
                info@stheer.co.uk
              </a>
            </div>
            <div>
              <Link
                to="/contact"
                className="font-montserrat font-bold text-sm text-brand-yellow hover:text-brand-gold uppercase tracking-[0.08em] transition-colors duration-200"
              >
                Book a Strategy Call &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-brand-border w-full mb-8" />

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <p className="font-dm-sans text-xs text-brand-muted">
            &copy; 2026 STHEER. All rights reserved.
          </p>

          {/* Centre: Muted agency mantra */}
          <p className="hidden md:block font-dm-sans font-medium text-[11px] text-brand-muted/60 uppercase tracking-[0.15em] select-none">
            Stay Steady &middot; Build Systems &middot; Scale with Purpose
          </p>

          {/* Right: Legal links */}
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="font-dm-sans text-xs text-brand-muted hover:text-brand-yellow transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-dm-sans text-xs text-brand-muted hover:text-brand-yellow transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
