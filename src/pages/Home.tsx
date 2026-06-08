import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, TrendingUp, Layers, Pen, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionLabel } from '../components/ui/SectionLabel';
import { CountUp } from '../components/ui/CountUp';

export const Home: React.FC = () => {
  const heroRef = useRef(null);
  
  // Word-by-word reveal variants
  const heroHeadline = "We Only Grow If You Grow.";
  const headlineWords = heroHeadline.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  // Section scroll reveal helper
  const SectionReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1.1 Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-brand-black flex items-center pt-24 pb-16 px-6 md:px-8 noise-overlay"
      >
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel>Digital Growth Infrastructure</SectionLabel>
            </motion.div>

            {/* Word-by-word Headline Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-montserrat font-extrabold text-[clamp(2.75rem,6vw,5.5rem)] text-brand-white leading-[1.08] tracking-[-0.03em] mb-6 flex flex-wrap gap-x-4 max-w-[820px]"
            >
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Decorative line below headline */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
              className="h-[2px] bg-brand-yellow w-40 mb-8"
            />

            {/* Sub-headline */}
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="font-dm-sans font-regular text-[clamp(1.1rem,2vw,1.375rem)] text-brand-off-white leading-relaxed max-w-[560px] mb-4"
            >
              Building digital infrastructure for businesses that refuse to stay small.
            </motion.p>

            {/* Supporting paragraph */}
            <motion.p
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="font-dm-sans font-regular text-base text-brand-muted leading-relaxed max-w-[520px] mb-8"
            >
              Most agencies sell you services. We build you systems — connected, compounding, and designed to run long after the campaign ends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              custom={1.0}
              className="flex flex-wrap gap-4"
            >
              <Button to="/contact" variant="primary">
                Book a Strategy Call
              </Button>
              <Button to="/services" variant="secondary">
                Explore What We Build
              </Button>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-4" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-brand-muted hover:text-brand-yellow cursor-pointer" />
          </motion.div>
        </div>
      </section>

      {/* 1.2 Social Proof Strip */}
      <section className="bg-brand-surface border-y border-brand-border py-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="font-dm-sans font-regular text-[15px] text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Trusted by founders, operators, and growth teams across e-commerce, SaaS, real estate, hospitality, and professional services.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 3, suffix: '+', label: 'Years Building' },
              { value: 18, suffix: '+', label: 'Businesses Scaled' },
              { value: 9, suffix: '', label: 'Integrated Services' },
              { value: 0, text: 'Your Growth', label: 'One Consistent Goal' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="font-montserrat font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-brand-yellow leading-none mb-2 select-none">
                  {stat.text ? (
                    <span className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] tracking-tight text-brand-yellow leading-tight block pt-2">
                      {stat.text}
                    </span>
                  ) : (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="font-dm-sans font-medium text-xs md:text-[13px] text-brand-muted uppercase tracking-[0.08em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.3 What We Build */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-left">
            <SectionLabel>What We Build</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white leading-tight tracking-[-0.02em]">
              Four Systems.<br />One Infrastructure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="flex flex-col items-start text-left">
              <div className="p-3 bg-brand-surface-2 border border-brand-border rounded-[4px] text-brand-yellow mb-6">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-brand-white mb-3">
                Websites & Systems
              </h3>
              <p className="font-dm-sans text-[15px] text-brand-off-white/80 leading-relaxed mb-6 flex-grow">
                Websites, CRM infrastructure, SaaS platforms, automation, and digital systems designed for scale.
              </p>
              <Button to="/services" variant="ghost" className="p-0 text-brand-yellow hover:text-brand-gold self-start text-xs font-bold tracking-[0.08em]">
                Explore &rarr;
              </Button>
            </Card>

            <Card className="flex flex-col items-start text-left">
              <div className="p-3 bg-brand-surface-2 border border-brand-border rounded-[4px] text-brand-yellow mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-brand-white mb-3">
                Growth Marketing
              </h3>
              <p className="font-dm-sans text-[15px] text-brand-off-white/80 leading-relaxed mb-6 flex-grow">
                Paid advertising, SEO, analytics, and conversion systems built to generate measurable business growth.
              </p>
              <Button to="/services" variant="ghost" className="p-0 text-brand-yellow hover:text-brand-gold self-start text-xs font-bold tracking-[0.08em]">
                Explore &rarr;
              </Button>
            </Card>

            <Card className="flex flex-col items-start text-left">
              <div className="p-3 bg-brand-surface-2 border border-brand-border rounded-[4px] text-brand-yellow mb-6">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-brand-white mb-3">
                Social Media & Content
              </h3>
              <p className="font-dm-sans text-[15px] text-brand-off-white/80 leading-relaxed mb-6 flex-grow">
                Strategic content creation and platform management that builds attention, trust, and engagement.
              </p>
              <Button to="/services" variant="ghost" className="p-0 text-brand-yellow hover:text-brand-gold self-start text-xs font-bold tracking-[0.08em]">
                Explore &rarr;
              </Button>
            </Card>

            <Card className="flex flex-col items-start text-left">
              <div className="p-3 bg-brand-surface-2 border border-brand-border rounded-[4px] text-brand-yellow mb-6">
                <Pen className="w-7 h-7" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-brand-white mb-3">
                Brand & Design
              </h3>
              <p className="font-dm-sans text-[15px] text-brand-off-white/80 leading-relaxed mb-6 flex-grow">
                Visual identity, print, and marketing design that positions your business professionally online and offline.
              </p>
              <Button to="/services" variant="ghost" className="p-0 text-brand-yellow hover:text-brand-gold self-start text-xs font-bold tracking-[0.08em]">
                Explore &rarr;
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* 1.4 System Summary */}
      <section className="bg-brand-surface py-20 px-6 md:px-8 border-y border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left">
            <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight mb-6 max-w-[560px]">
              Every system we build is designed to compound your growth over time.
            </h2>
            <p className="font-dm-sans font-regular text-[17px] text-brand-off-white/90 leading-relaxed">
              STHEER is not a collection of freelancers or a one-trick agency. We are a full-stack digital growth infrastructure provider — meaning we build, connect, and operate every layer of your digital presence so that each part feeds the next. Websites drive traffic. Traffic feeds your CRM. Your CRM triggers automation. Automation fuels retention. Retention compounds revenue.
            </p>
          </div>
          
          {/* Right column: Large decorative branding rule/graphic */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end select-none">
            <div className="relative w-full max-w-[320px] aspect-[4/3] border border-brand-yellow/20 flex flex-col justify-between p-8 rounded-[4px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-brand-yellow/10 to-transparent pointer-events-none" />
              <div className="font-montserrat font-extrabold text-[80px] text-brand-yellow/10 leading-none">ST</div>
              <div className="h-[1px] bg-brand-yellow/30 w-full my-4" />
              <div className="font-dm-sans text-[11px] text-brand-yellow/60 uppercase tracking-[0.2em] text-right">
                Infrastructure Compound
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 The Growth System (Approach) */}
      <SectionReveal className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-center">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white tracking-[-0.02em]">
              A Systematic Approach to<br />Scaling Your Business
            </h2>
          </div>

          {/* 5-step Horizontal Flow (Desktop) / Vertical Stack (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative mb-16">
            {[
              {
                step: '01',
                title: 'Attention',
                desc: 'We engineer visibility. Through strategic content, paid campaigns, and SEO, we place your brand in front of the right people at the right moment.',
              },
              {
                step: '02',
                title: 'Conversion',
                desc: 'We turn interest into action. Optimised landing pages, persuasive messaging, and frictionless funnels convert visitors into qualified leads.',
              },
              {
                step: '03',
                title: 'Automation',
                desc: 'We make your business work while you sleep. Smart workflows, AI-powered chatbots, and CRM sequences keep your pipeline moving without manual effort.',
              },
              {
                step: '04',
                title: 'Retention',
                desc: 'We protect your most valuable asset — your existing customers. Personalised experiences, re-engagement campaigns, and loyalty-driven content keep them coming back.',
              },
              {
                step: '05',
                title: 'Scale',
                desc: 'We multiply what is working. Once a system proves itself, we expand it across channels, markets, and audiences with precision.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-brand-surface border border-brand-border p-6 rounded-[4px] flex flex-col justify-between h-72 text-left group overflow-hidden"
              >
                {/* Background number watermark */}
                <div className="absolute top-2 right-4 font-montserrat font-extrabold text-[5rem] text-brand-yellow/[0.04] group-hover:text-brand-yellow/[0.08] transition-colors leading-none select-none z-0">
                  {item.step}
                </div>

                <div className="z-10 mt-auto">
                  <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-montserrat font-bold text-xl md:text-2xl text-brand-yellow italic leading-relaxed">
              &ldquo;Every system connects. Every connection compounds.&rdquo;
            </p>
          </div>
        </div>
      </SectionReveal>

      {/* 1.6 Results Snapshot */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-y border-brand-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-left">
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white tracking-[-0.02em] leading-tight">
              Real Systems. Real Results.<br />Real Businesses Transformed.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                metric: '+340%',
                label: 'Revenue Growth',
                tag: 'E-Commerce',
                desc: 'Complete digital transformation including website rebuild, paid advertising, and CRM automation.',
              },
              {
                metric: '10,000+',
                label: 'Platform Users',
                tag: 'SaaS Startup',
                desc: 'Custom-built SaaS platform with automated onboarding and retention sequences.',
              },
              {
                metric: '+500%',
                label: 'Social Engagement',
                tag: 'Hospitality',
                desc: 'Full social media management and brand refresh across multiple locations.',
              },
              {
                metric: '3x',
                label: 'Lead Generation',
                tag: 'Real Estate',
                desc: 'Property showcase website integrated with CRM and automated lead nurturing.',
              },
            ].map((item, idx) => (
              <Card key={idx} className="flex flex-col text-left items-start justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-brand-yellow leading-none select-none">
                      {item.metric}
                    </span>
                    <span className="inline-block border border-brand-yellow/30 text-brand-yellow font-dm-sans font-medium text-[11px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-montserrat font-bold text-lg text-brand-white mb-2">
                    {item.label}
                  </h4>
                  <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 1.7 Closing CTA */}
      <section className="bg-brand-black py-24 px-6 md:px-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-yellow/20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-yellow/20" />

        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-8">
          <h2 className="font-montserrat font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-brand-white leading-tight tracking-[-0.02em] max-w-[720px]">
            Your Competitors Are Not Standing Still.
          </h2>
          <p className="font-dm-sans font-regular text-base md:text-lg text-brand-muted leading-relaxed max-w-[560px]">
            Every day without a connected digital system is a day your competition gains ground. STHEER builds the infrastructure that closes that gap — and keeps it closed.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Book Your Free Strategy Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
