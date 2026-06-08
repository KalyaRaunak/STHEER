import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { scaleUp, staggerContainer, fadeIn, fadeUp, viewport } from '../lib/animations';

interface Project {
  id: number;
  title: string;
  category: string;
  categoryTag: string;
  outcome: string;
  desc: string;
  imgUrl: string;
  imgAlt: string;
}

export const Work: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Websites & Systems',
    'Digital Growth',
    'Social Media',
    'Software & SaaS',
    'Design',
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform Rebuild',
      category: 'Websites & Systems',
      categoryTag: 'Websites & Systems',
      outcome: '+340% revenue in 6 months',
      desc: 'Bespoke high-converting digital storefront built on modern decoupled systems with direct ERP integration.',
      imgUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'E-commerce website on laptop screen',
    },
    {
      id: 2,
      title: 'Client Portal & SaaS Platform',
      category: 'Software & SaaS',
      categoryTag: 'Software & SaaS',
      outcome: '10,000+ active users onboarded',
      desc: 'Custom-designed portal architecture with subscription controls, real-time metrics, and automated onboarding.',
      imgUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'Mobile app interface on smartphone',
    },
    {
      id: 3,
      title: 'Paid Media Growth Campaign',
      category: 'Digital Growth',
      categoryTag: 'Digital Growth',
      outcome: '3x lead volume within 90 days',
      desc: 'Integrated lead generation campaigns using Meta and Google ads alongside conversion audits.',
      imgUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'Digital advertising campaign performance dashboard',
    },
    {
      id: 4,
      title: 'Hospitality Brand Social Presence',
      category: 'Social Media',
      categoryTag: 'Social Media',
      outcome: '+500% engagement rate',
      desc: 'Strategic brand storytelling, high-fidelity content grids, and community monitoring across channels.',
      imgUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'Social media content grid on smartphone',
    },
    {
      id: 5,
      title: 'Brand Identity System',
      category: 'Design',
      categoryTag: 'Design',
      outcome: 'Full visual identity delivered in 3 weeks',
      desc: 'Clean corporate design guidelines, logo marks, custom grids, and typography structures for UK market.',
      imgUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'Brand identity design system with logo and colours',
    },
    {
      id: 6,
      title: 'Real Estate Lead Infrastructure',
      category: 'Digital Growth',
      categoryTag: 'Digital Growth',
      outcome: '3x qualified leads month-on-month',
      desc: 'Property landing page build paired with database automation and active CRM pipeline routing.',
      imgUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80',
      imgAlt: 'Real estate property photography for marketing',
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
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionLabel>Our Work</SectionLabel>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-brand-white leading-tight tracking-[-0.03em] max-w-[820px] mb-4"
          >
            Our Work Speaks
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="font-dm-sans font-medium text-lg md:text-xl text-brand-yellow max-w-[640px] mb-8 leading-relaxed"
          >
            Across nine disciplines and dozens of industries, one standard applies to every project: it has to work.
          </motion.p>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="font-dm-sans text-base md:text-[17px] text-brand-muted leading-relaxed max-w-[800px]"
          >
            The work below represents a selection from our portfolio across websites, software, social media, design, and automation. Every project here began with a business problem and ended with a measurable outcome.
          </motion.p>
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
          {/* AnimatePresence for filter transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={scaleUp}
                  className="flex flex-col text-left group bg-brand-surface border border-brand-border p-6 rounded-[4px]"
                >
                  {/* Image container: overflow-hidden, image zoom scale 1.04 on hover */}
                  <div className="aspect-[16/9] w-full bg-brand-surface-2 border border-brand-border rounded-[4px] mb-6 overflow-hidden relative">
                    <img
                      src={project.imgUrl}
                      alt={project.imgAlt}
                      loading="lazy"
                      decoding="async"
                      width={700}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-104"
                    />
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4.4 Portfolio CTA */}
      <section className="bg-brand-surface py-20 px-6 md:px-8 border-t border-brand-border text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[640px] mx-auto flex flex-col items-center gap-6"
        >
          <p className="font-dm-sans text-base md:text-lg text-brand-off-white/90 leading-relaxed">
            Want to see work specific to your industry? Book a call and we will share relevant case studies directly.
          </p>
          <Button to="/contact" variant="primary">
            Book a Call
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Work;
