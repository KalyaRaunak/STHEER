import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Heart, Link2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionLabel } from '../components/ui/SectionLabel';
import { fadeUp, fadeIn, staggerContainer, slideInLeft, scaleUp, viewport } from '../lib/animations';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alexander Sterling',
      role: 'Founder & Principal Architect',
      imgUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Ex-consultancy head. Obsessed with building software and marketing pipes that do not break under pressure.',
    },
    {
      name: 'Elena Rostova',
      role: 'Lead UX & Systems Designer',
      imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in digital typography and high-converting user pathways. Ensures STHEER systems look as premium as they perform.',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Growth Marketing',
      imgUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Former e-commerce operator. Manages paid acquisition and SEO infrastructure with ruthless analytical discipline.',
    },
    {
      name: 'James Litherland',
      role: 'Lead Full-Stack Developer',
      imgUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in CRM integrations, custom database systems, and AI automation. Keeps backends fast and secure.',
    },
  ];

  const heroHeadline = "Built From Pressure. Shaped by Discipline. Designed for Growth.";
  const words = heroHeadline.split(' ');

  const paragraphs = [
    "STHEER was not built in a boardroom. It was built in the gap — the space between what businesses are promised by agencies and what they actually receive.",
    "Our founder spent years watching capable businesses stall, not because their product was wrong or their market was small, but because their digital infrastructure was fragmented. They had a website that did not convert. Social media that did not connect to sales. Paid ads that burned budget without building systems. CRM tools that nobody used. Each piece existed in isolation, doing its job poorly, disconnected from everything else.",
    "STHEER was created to solve that. Not to offer another single service in an already crowded market, but to build the entire infrastructure — connected, intentional, and designed to compound over time.",
    "The name STHEER means exactly that. Stay steady. Stay the course. Resist the noise of short-term tactics and build something with structural integrity. Growth that lasts does not come from a single campaign or a viral moment. It comes from discipline, systems, and consistency applied over time."
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 2.1 Page Hero */}
      <section className="min-h-screen bg-brand-black flex items-center pt-24 pb-16 px-6 md:px-8 noise-overlay">
        <div className="max-w-[1200px] w-full mx-auto text-left">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <SectionLabel>Our Story</SectionLabel>
          </motion.div>
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="font-montserrat font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] text-brand-white leading-[1.1] tracking-[-0.03em] max-w-[960px] mb-8 flex flex-wrap gap-x-4"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: i * 0.08 }
                  }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[2px] bg-brand-yellow w-40"
          />
        </div>
      </section>

      {/* 2.2 Founder Story */}
      <section className="bg-brand-black py-24 px-6 md:px-8 border-t border-brand-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Left Column: Title + Pull Quote + Team Image */}
          <motion.div variants={slideInLeft} className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div>
              <SectionLabel>The Story Behind STHEER</SectionLabel>
              <h2 className="font-montserrat font-bold text-3xl text-brand-white mt-2 tracking-tight">
                Systems Over Hype.
              </h2>
            </div>
            
            <div className="border-l-4 border-brand-yellow pl-6 py-2 my-2">
              <p className="font-montserrat font-bold text-lg md:text-xl text-brand-white leading-relaxed italic">
                &ldquo;STHEER is not just about growth. It is about staying steady long enough to build something that lasts.&rdquo;
              </p>
            </div>

            {/* Curated Unsplash collaborative team image */}
            <div className="w-full aspect-[4/3] rounded-[4px] overflow-hidden bg-brand-surface border border-brand-border">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaborating on digital strategy in a modern office"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div variants={staggerContainer} className="lg:col-span-7 flex flex-col gap-8 text-left font-dm-sans text-[17px] text-brand-off-white/90 leading-relaxed">
            {paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 2.3 Mission */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-y border-brand-border text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[720px] mx-auto flex flex-col items-center gap-6"
        >
          <SectionLabel>Why We Exist</SectionLabel>
          <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight">
            We exist to close the gap between ambition and infrastructure.
          </h2>
          <p className="font-dm-sans font-regular text-[17px] text-brand-off-white/80 leading-relaxed">
            Too many businesses with genuine potential are held back by digital systems that do not work together. Our mission is to build the connected infrastructure that gives those businesses the foundation they deserve — and the momentum to grow beyond it.
          </p>
        </motion.div>
      </section>

      {/* 2.4 Values */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16 text-left"
          >
            <SectionLabel>What We Stand For</SectionLabel>
            <h2 className="font-montserrat font-bold text-4xl text-brand-white tracking-tight">
              Our Values
            </h2>
          </motion.div>

          {/* staggerContainer + scaleUp variant */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              {
                icon: <Shield className="w-6 h-6 text-brand-yellow mb-6" />,
                title: 'Systems Over Shortcuts',
                desc: 'We do not believe in quick fixes. We believe in building infrastructure that works independently of trend cycles, algorithm changes, and platform shifts.'
              },
              {
                icon: <Eye className="w-6 h-6 text-brand-yellow mb-6" />,
                title: 'Transparency Without Jargon',
                desc: 'We communicate clearly, report honestly, and never hide behind vanity metrics. You will always know what we are doing, why we are doing it, and what it is producing.'
              },
              {
                icon: <Heart className="w-6 h-6 text-brand-yellow mb-6" />,
                title: 'Growth With Integrity',
                desc: 'We only take on clients we genuinely believe we can help. If your business is not the right fit, we will tell you — and point you in the right direction.'
              },
              {
                icon: <Link2 className="w-6 h-6 text-brand-yellow mb-6" />,
                title: 'Connected Thinking',
                desc: 'We see your business as a whole system, not a collection of isolated channels. Every decision we make considers how it connects to everything else.'
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={scaleUp}
                className="h-full"
              >
                <Card className="flex flex-col text-left items-start h-full" hoverEffect={true}>
                  {value.icon}
                  <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                    {value.title}
                  </h3>
                  <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                    {value.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2.5 Team */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-t border-brand-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-5 text-left"
            >
              <SectionLabel>The Team</SectionLabel>
              <h2 className="font-montserrat font-bold text-[clamp(2rem,3.5vw,3rem)] text-brand-white leading-tight tracking-tight mb-6">
                The People Who Build Your Infrastructure
              </h2>
              <p className="font-dm-sans text-base text-brand-off-white/80 leading-relaxed">
                STHEER is a focused team of strategists, designers, developers, and growth specialists who work as one integrated unit. We do not outsource your growth to junior staff or rotating contractors. The people who scope your project are the people who deliver it.
              </p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-brand-black border border-brand-border p-6 rounded-[4px] flex flex-col text-left group"
                >
                  {/* Portrait Container with Grayscale-to-Color transition */}
                  <motion.div
                    variants={scaleUp}
                    className="aspect-square w-full bg-brand-surface-2 border border-brand-border rounded-[4px] mb-6 overflow-hidden relative"
                  >
                    <img
                      src={member.imgUrl}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover grayscale transition-all duration-400 group-hover:grayscale-0 group-hover:scale-104"
                    />
                  </motion.div>

                  <h3 className="font-montserrat font-bold text-lg text-brand-white mb-1 group-hover:text-brand-yellow transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-dm-sans font-medium text-sm text-brand-yellow mb-3">
                    {member.role}
                  </div>
                  <p className="font-dm-sans text-xs text-brand-muted leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  {/* Transparent placeholder disclaimer badge */}
                  <div className="mt-auto pt-2 border-t border-brand-border/30">
                    <span className="font-dm-sans text-[11px] text-brand-muted/70 italic">
                      [Placeholder — Real Photo Coming Soon]
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center pt-8 border-t border-brand-border/40"
          >
            <Button to="/contact" variant="primary">
              Meet the Team — Book a Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
