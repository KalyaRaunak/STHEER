import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';

interface Project {
  id: number;
  title: string;
  category: string;
  categoryTag: string; // The specific display label for matching filter
  outcome: string;
  desc: string;
}

export const Work: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Websites & Systems',
    'Digital Growth',
    'Social Media',
    'Software & SaaS',
    'CRM & Automation',
    'Design',
    'Print & Physical',
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Aether Logistics Hub',
      category: 'Software & SaaS',
      categoryTag: 'Software & SaaS',
      outcome: '+240% Operational Efficiency',
      desc: 'Bespoke logistics platform connecting fleet managers, dispatchers, and automated route schedulers.',
    },
    {
      id: 2,
      title: 'Vanguard E-Commerce',
      category: 'Websites & Systems',
      categoryTag: 'Websites & Systems',
      outcome: '+340% Revenue Growth',
      desc: 'Custom-built headless storefront with lightning-fast speeds and fully integrated CRM sync.',
    },
    {
      id: 3,
      title: 'Solas Apparel Acquisition',
      category: 'Digital Growth',
      categoryTag: 'Digital Growth',
      outcome: '4.8x Advertising ROAS',
      desc: 'High-intent search engine optimisation and targeted Meta ads campaigns targeting B2B procurement.',
    },
    {
      id: 4,
      title: 'Gusto Group Hospitality',
      category: 'Social Media',
      categoryTag: 'Social Media',
      outcome: '+500% Social Engagement',
      desc: 'Strategic content production, monthly photography direction, and community management across platforms.',
    },
    {
      id: 5,
      title: 'Harbor Property Group',
      category: 'CRM & Automation',
      categoryTag: 'CRM & Automation',
      outcome: '3x Qualified Lead Flow',
      desc: 'Interactive property showcase page syncing directly to Salesforce CRM with automated email nursery tracks.',
    },
    {
      id: 6,
      title: 'Kaelen Brand Refresh',
      category: 'Design',
      categoryTag: 'Design',
      outcome: 'B2B Authority Repositioning',
      desc: 'Comprehensive visual system audit, typography rules, brand guidelines, and digital sales collateral.',
    },
    {
      id: 7,
      title: 'Sovereign Summit Exhibitions',
      category: 'Print & Physical',
      categoryTag: 'Print & Physical',
      outcome: 'Seamless Offline Branding',
      desc: 'Design and print management of physical banner roll-ups, vinyl decals, and event brochures.',
    },
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 4.1 Page Hero */}
      <section className="min-h-[50vh] bg-brand-black flex items-center pt-28 pb-16 px-6 md:px-8 noise-overlay">
        <div className="max-w-[1200px] w-full mx-auto text-left">
          <SectionLabel>Our Work</SectionLabel>
          <h1 className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-brand-white leading-tight tracking-[-0.03em] max-w-[820px] mb-4">
            Our Work Speaks
          </h1>
          <p className="font-dm-sans font-medium text-lg md:text-xl text-brand-yellow max-w-[640px] mb-8 leading-relaxed">
            Across nine disciplines and dozens of industries, one standard applies to every project: it has to work.
          </p>
          <p className="font-dm-sans text-base md:text-[17px] text-brand-muted leading-relaxed max-w-[800px]">
            The work below represents a selection from our portfolio across websites, software, social media, design, and automation. Every project here began with a business problem and ended with a measurable outcome.
          </p>
        </div>
      </section>

      {/* 4.2 Filter Tabs */}
      <section className="bg-brand-surface py-6 border-y border-brand-border px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-none py-2 justify-start lg:justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-dm-sans text-sm px-4 py-2 rounded-[2px] border transition-all duration-200 focus:outline-none ${
                selectedFilter === filter
                  ? 'bg-brand-yellow border-brand-yellow text-brand-black font-semibold'
                  : 'bg-transparent border-transparent text-brand-white hover:border-brand-yellow/50 hover:text-brand-yellow'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* 4.3 Portfolio Grid */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col text-left group bg-brand-surface border border-brand-border p-6 rounded-[4px]"
                >
                  {/* Aspect-ratio image placeholder */}
                  <div className="aspect-[16/9] w-full bg-brand-surface-2 border border-brand-border rounded-[4px] mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-brand-yellow/30 transition-colors">
                    <span className="font-montserrat font-bold text-xs uppercase tracking-widest text-brand-muted opacity-40 group-hover:opacity-75 transition-opacity group-hover:scale-105 duration-300">
                      Case Study
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent pointer-events-none" />
                  </div>

                  <div className="mb-4">
                    <span className="inline-block border border-brand-yellow/30 text-brand-yellow font-dm-sans font-medium text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-3">
                      {project.categoryTag}
                    </span>
                    <h3 className="font-dm-sans font-semibold text-lg text-brand-white group-hover:text-brand-yellow transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>

                  <p className="font-montserrat font-bold text-xs text-brand-yellow uppercase tracking-[0.06em] mb-3">
                    {project.outcome}
                  </p>

                  <p className="font-dm-sans text-xs text-brand-muted leading-relaxed mb-6 flex-grow">
                    {project.desc}
                  </p>

                  <a
                    href="/contact"
                    className="font-dm-sans text-xs font-semibold text-brand-yellow hover:text-brand-gold mt-auto flex items-center gap-1 group-hover:underline underline-offset-4"
                  >
                    View Project &rarr;
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4.4 Portfolio CTA */}
      <section className="bg-brand-surface py-20 px-6 md:px-8 border-t border-brand-border text-center">
        <div className="max-w-[640px] mx-auto flex flex-col items-center gap-6">
          <p className="font-dm-sans text-base md:text-lg text-brand-off-white/90 leading-relaxed">
            Want to see work specific to your industry? Book a call and we will share relevant case studies directly.
          </p>
          <Button to="/contact" variant="primary">
            Book a Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Work;
