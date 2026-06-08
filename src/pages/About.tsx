import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Heart, Link2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionLabel } from '../components/ui/SectionLabel';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alexander Sterling',
      role: 'Founder & Principal Architect',
      bio: 'Ex-consultancy head. Obsessed with building software and marketing pipes that do not break under pressure.',
    },
    {
      name: 'Elena Rostova',
      role: 'Lead UX & Systems Designer',
      bio: 'Specialist in digital typography and high-converting user pathways. Ensures STHEER systems look as premium as they perform.',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Growth Marketing',
      bio: 'Former e-commerce operator. Manages paid acquisition and SEO infrastructure with ruthless analytical discipline.',
    },
    {
      name: 'James Litherland',
      role: 'Lead Full-Stack Developer',
      bio: 'Specialist in CRM integrations, custom database systems, and AI automation. Keeps backends fast and secure.',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 2.1 Page Hero */}
      <section className="min-h-screen bg-brand-black flex items-center pt-24 pb-16 px-6 md:px-8 noise-overlay">
        <div className="max-w-[1200px] w-full mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SectionLabel>Our Story</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            className="font-montserrat font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] text-brand-white leading-[1.1] tracking-[-0.03em] max-w-[960px] mb-8"
          >
            Built From Pressure.<br />
            Shaped by Discipline.<br />
            Designed for Growth.
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[2px] bg-brand-yellow w-40"
          />
        </div>
      </section>

      {/* 2.2 Founder Story */}
      <section className="bg-brand-black py-24 px-6 md:px-8 border-t border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Title + Pull Quote */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <SectionLabel>The Story Behind STHEER</SectionLabel>
              <h2 className="font-montserrat font-bold text-3xl text-brand-white mt-2 tracking-tight">
                Systems Over Hype.
              </h2>
            </div>
            
            <div className="border-l-4 border-brand-yellow pl-6 py-2 my-4">
              <p className="font-montserrat font-bold text-lg md:text-xl text-brand-white leading-relaxed italic">
                &ldquo;STHEER is not just about growth. It is about staying steady long enough to build something that lasts.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left font-dm-sans text-[17px] text-brand-off-white/90 leading-relaxed">
            <p>
              STHEER was not built in a boardroom. It was built in the gap — the space between what businesses are promised by agencies and what they actually receive.
            </p>
            <p>
              Our founder spent years watching capable businesses stall, not because their product was wrong or their market was small, but because their digital infrastructure was fragmented. They had a website that did not convert. Social media that did not connect to sales. Paid ads that burned budget without building systems. CRM tools that nobody used. Each piece existed in isolation, doing its job poorly, disconnected from everything else.
            </p>
            <p>
              STHEER was created to solve that. Not to offer another single service in an already crowded market, but to build the entire infrastructure — connected, intentional, and designed to compound over time.
            </p>
            <p>
              The name STHEER means exactly that. Stay steady. Stay the course. Resist the noise of short-term tactics and build something with structural integrity. Growth that lasts does not come from a single campaign or a viral moment. It comes from discipline, systems, and consistency applied over time.
            </p>
          </div>
        </div>
      </section>

      {/* 2.3 Mission */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-y border-brand-border text-center">
        <div className="max-w-[720px] mx-auto flex flex-col items-center gap-6">
          <SectionLabel>Why We Exist</SectionLabel>
          <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight">
            We exist to close the gap between ambition and infrastructure.
          </h2>
          <p className="font-dm-sans font-regular text-[17px] text-brand-off-white/80 leading-relaxed">
            Too many businesses with genuine potential are held back by digital systems that do not work together. Our mission is to build the connected infrastructure that gives those businesses the foundation they deserve — and the momentum to grow beyond it.
          </p>
        </div>
      </section>

      {/* 2.4 Values */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-left">
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 className="font-montserrat font-bold text-4xl text-brand-white tracking-tight">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="flex flex-col text-left items-start">
              <Shield className="w-6 h-6 text-brand-yellow mb-6" />
              <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                Systems Over Shortcuts
              </h3>
              <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                We do not believe in quick fixes. We believe in building infrastructure that works independently of trend cycles, algorithm changes, and platform shifts.
              </p>
            </Card>

            <Card className="flex flex-col text-left items-start">
              <Eye className="w-6 h-6 text-brand-yellow mb-6" />
              <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                Transparency Without Jargon
              </h3>
              <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                We communicate clearly, report honestly, and never hide behind vanity metrics. You will always know what we are doing, why we are doing it, and what it is producing.
              </p>
            </Card>

            <Card className="flex flex-col text-left items-start">
              <Heart className="w-6 h-6 text-brand-yellow mb-6" />
              <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                Growth With Integrity
              </h3>
              <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                We only take on clients we genuinely believe we can help. If your business is not the right fit, we will tell you — and point you in the right direction.
              </p>
            </Card>

            <Card className="flex flex-col text-left items-start">
              <Link2 className="w-6 h-6 text-brand-yellow mb-6" />
              <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                Connected Thinking
              </h3>
              <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                We see your business as a whole system, not a collection of isolated channels. Every decision we make considers how it connects to everything else.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 2.5 Team */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-t border-brand-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
            <div className="lg:col-span-5 text-left">
              <SectionLabel>The Team</SectionLabel>
              <h2 className="font-montserrat font-bold text-[clamp(2rem,3.5vw,3rem)] text-brand-white leading-tight tracking-tight mb-6">
                The People Who Build Your Infrastructure
              </h2>
              <p className="font-dm-sans text-base text-brand-off-white/80 leading-relaxed">
                STHEER is a focused team of strategists, designers, developers, and growth specialists who work as one integrated unit. We do not outsource your growth to junior staff or rotating contractors. The people who scope your project are the people who deliver it.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-brand-black border border-brand-border p-6 rounded-[4px] flex flex-col text-left group"
                >
                  <div className="aspect-square w-full bg-brand-surface-2 border border-brand-border rounded-[4px] mb-6 flex items-center justify-center select-none text-brand-muted font-montserrat font-bold text-xs uppercase tracking-widest relative overflow-hidden">
                    <span className="opacity-40 group-hover:opacity-80 transition-opacity">STHEER CREW</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-brand-white mb-1 group-hover:text-brand-yellow transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-dm-sans font-medium text-sm text-brand-yellow mb-3">
                    {member.role}
                  </div>
                  <p className="font-dm-sans text-xs text-brand-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-brand-border/40">
            <Button to="/contact" variant="primary">
              Meet the Team — Book a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
