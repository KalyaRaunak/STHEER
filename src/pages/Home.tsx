import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, TrendingUp, Layers, Pen, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { fadeUp, fadeIn, staggerContainer, slideInLeft, slideInRight, viewport, cardEntrance, cardRow, cardGrid } from '../lib/animations';
import { BeamsBackground } from '../components/ui/beams-background';

// Viewport-triggered animated numeric counter
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export const Home: React.FC = () => {
  const heroRef = useRef(null);
  
  // Word-by-word reveal headline configuration
  const headline = "We Only Grow If You Grow.";
  const words = headline.split(' ');

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1.1 Hero Section */}
      <BeamsBackground
        ref={heroRef}
        intensity="strong"
        className="flex items-center pt-24 pb-16 px-6 md:px-8 bg-brand-black/90 noise-overlay"
      >
        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start text-left z-10">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <SectionLabel>Digital Growth Infrastructure</SectionLabel>
            </motion.div>

            {/* Word-by-word Headline Reveal */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="font-montserrat font-extrabold text-[clamp(2.75rem,6vw,5.5rem)] text-brand-white leading-[1.08] tracking-[-0.03em] mb-6 flex flex-wrap gap-y-2 max-w-[820px]"
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
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
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
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.75 }}
              className="font-dm-sans font-regular text-[clamp(1.1rem,2vw,1.375rem)] text-brand-off-white leading-relaxed max-w-[560px] mb-4"
            >
              Building digital infrastructure for businesses that refuse to stay small.
            </motion.p>

            {/* Supporting paragraph */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
              className="font-dm-sans font-regular text-base text-brand-muted leading-relaxed max-w-[520px] mb-8"
            >
              Most agencies sell you services. We build you systems — connected, compounding, and designed to run long after the campaign ends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.15 }}
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-brand-muted hover:text-brand-yellow cursor-pointer" />
          </motion.div>
        </div>
      </BeamsBackground>

      {/* 1.2 Social Proof Strip */}
      <section className="bg-brand-surface border-y border-brand-border py-16 px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[1200px] mx-auto text-center"
        >
          <motion.p
            variants={fadeIn}
            className="font-dm-sans font-regular text-[15px] text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Trusted by founders, operators, and growth teams across e-commerce, SaaS, real estate, hospitality, and professional services.
          </motion.p>

          <motion.div
            variants={cardRow}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: 3, suffix: '+', label: 'Years Building' },
              { value: 18, suffix: '+', label: 'Businesses Scaled' },
              { value: 9, suffix: '', label: 'Integrated Services' },
              { value: 0, text: 'Your Growth', label: 'One Consistent Goal' },
            ].map((stat, idx) => {
              const statCardVariants = {
                hidden: cardEntrance.hidden,
                visible: cardEntrance.visible,
                hover: {
                  y: -3,
                  transition: { duration: 0.18, ease: 'easeOut' as const }
                }
              };

              return (
                <motion.div
                  key={idx}
                  variants={statCardVariants}
                  whileHover="hover"
                  className="flex flex-col items-center cursor-default"
                >
                  <motion.div
                    variants={{
                      hover: { scale: 1.06 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-montserrat font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-brand-yellow leading-none mb-2 select-none"
                  >
                    {stat.text ? (
                      <span className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] tracking-tight text-brand-yellow leading-tight block pt-2">
                        {stat.text}
                      </span>
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </motion.div>
                  <div className="font-dm-sans font-medium text-xs md:text-[13px] text-brand-muted uppercase tracking-[0.08em]">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* 1.3 What We Build */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16 text-left"
          >
            <SectionLabel>What We Build</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white leading-tight tracking-[-0.02em]">
              Four Systems.<br />One Infrastructure.
            </h2>
          </motion.div>

          <motion.div
            variants={cardGrid}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {[
              {
                icon: <Globe className="w-7 h-7" />,
                title: 'Websites & Systems',
                body: 'Websites, CRM infrastructure, SaaS platforms, automation, and digital systems designed for scale.'
              },
              {
                icon: <TrendingUp className="w-7 h-7" />,
                title: 'Growth Marketing',
                body: 'Paid advertising, SEO, analytics, and conversion systems built to generate measurable business growth.'
              },
              {
                icon: <Layers className="w-7 h-7" />,
                title: 'Social Media & Content',
                body: 'Strategic content creation and platform management that builds attention, trust, and engagement.'
              },
              {
                icon: <Pen className="w-7 h-7" />,
                title: 'Brand & Design',
                body: 'Visual identity, print, and marketing design that positions your business professionally online and offline.'
              }
            ].map((service, i) => {
              const serviceCardVariants = {
                hidden: cardEntrance.hidden,
                visible: cardEntrance.visible,
                hover: {
                  y: -6,
                  transition: { duration: 0.25, ease: 'easeOut' as const }
                }
              };

              return (
                <motion.div
                  key={i}
                  variants={serviceCardVariants}
                  whileHover="hover"
                  className="relative bg-brand-surface border border-brand-border rounded-[4px] p-8 flex flex-col items-start text-left h-full cursor-default overflow-hidden service-card"
                >
                  {/* Yellow top border line — animate width on hover */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-brand-yellow"
                    initial={{ width: '0%' }}
                    variants={{
                      hover: { width: '100%' }
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />

                  {/* Icon — animate on card hover */}
                  <motion.div
                    variants={{
                      hover: { rotate: 6, scale: 1.1 }
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="p-3 bg-brand-surface-2 border border-brand-border rounded-[4px] text-brand-yellow mb-6"
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="font-montserrat font-bold text-xl text-brand-white mb-3">
                    {service.title}
                  </h3>
                  <p className="font-dm-sans text-[15px] text-brand-off-white/80 leading-relaxed mb-6 flex-grow">
                    {service.body}
                  </p>

                  {/* Arrow link — slides right on hover */}
                  <motion.div
                    variants={{
                      hover: { x: 5 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button to="/services" variant="ghost" className="p-0 text-brand-yellow hover:text-brand-gold self-start text-xs font-bold tracking-[0.08em] card-link">
                      Explore &rarr;
                    </Button>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 1.4 System Summary */}
      <section className="bg-brand-surface py-20 px-6 md:px-8 border-y border-brand-border">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <motion.div variants={slideInLeft} className="lg:col-span-7 text-left">
            <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight mb-6 max-w-[560px]">
              Every system we build is designed to compound your growth over time.
            </h2>
            <p className="font-dm-sans font-regular text-[17px] text-brand-off-white/90 leading-relaxed">
              STHEER is not a collection of freelancers or a one-trick agency. We are a full-stack digital growth infrastructure provider — meaning we build, connect, and operate every layer of your digital presence so that each part feeds the next. Websites drive traffic. Traffic feeds your CRM. Your CRM triggers automation. Automation fuels retention. Retention compounds revenue.
            </p>
          </motion.div>
          
          {/* Right column: Large decorative branding rule/graphic */}
          <motion.div variants={slideInRight} className="lg:col-span-5 flex justify-center lg:justify-end select-none">
            <div className="relative w-full max-w-[320px] aspect-[4/3] border border-brand-yellow/20 flex flex-col justify-between p-8 rounded-[4px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-brand-yellow/10 to-transparent pointer-events-none" />
              <div className="font-montserrat font-extrabold text-[80px] text-brand-yellow/10 leading-none">ST</div>
              <div className="h-[1px] bg-brand-yellow/30 w-full my-4" />
              <div className="font-dm-sans text-[11px] text-brand-yellow/60 uppercase tracking-[0.2em] text-right">
                Infrastructure Compound
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 1.5 The Growth System (Approach) */}
      <section className="bg-brand-black py-24 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16 text-center"
          >
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white tracking-[-0.02em]">
              A Systematic Approach to<br />Scaling Your Business
            </h2>
          </motion.div>

          {/* 5-step Horizontal Flow (Desktop) / Vertical Stack (Mobile) */}
          <motion.div
            variants={cardRow}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative mb-16"
          >
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
            ].map((item, idx) => {
              const stepCardVariants = {
                hidden: cardEntrance.hidden,
                visible: cardEntrance.visible,
                hover: {
                  y: -4,
                  transition: { duration: 0.2, ease: 'easeOut' as const }
                }
              };

              return (
                <motion.div
                  key={idx}
                  variants={stepCardVariants}
                  whileHover="hover"
                  className="relative bg-brand-surface border border-brand-border p-6 rounded-[4px] flex flex-col justify-between h-72 text-left group overflow-hidden step-card"
                >
                  {/* Background number watermark — moves up slightly on hover */}
                  <motion.div
                    variants={{
                      hover: { y: -6, color: 'rgba(255, 215, 0, 0.14)' }
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-2 right-4 font-montserrat font-extrabold text-[5rem] text-brand-yellow/[0.04] transition-colors leading-none select-none z-0 pointer-events-none"
                  >
                    {item.step}
                  </motion.div>

                  <div className="z-10 mt-auto">
                    <h3 className="font-dm-sans font-semibold text-lg text-brand-white mb-3">
                      {item.title}
                    </h3>
                    <p className="font-dm-sans text-sm text-brand-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-center"
          >
            <p className="font-montserrat font-bold text-xl md:text-2xl text-brand-yellow italic leading-relaxed">
              &ldquo;Every system connects. Every connection compounds.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1.6 Results Snapshot */}
      <section className="bg-brand-surface py-24 px-6 md:px-8 border-y border-brand-border">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-16 text-left"
          >
            <SectionLabel>Real Results</SectionLabel>
            <h2 className="font-montserrat font-bold text-[clamp(2rem,4vw,3.5rem)] text-brand-white tracking-[-0.02em] leading-tight">
              Real Systems. Real Results.<br />Real Businesses Transformed.
            </h2>
          </motion.div>

          <motion.div
            variants={cardGrid}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                metric: 340,
                suffix: '%',
                label: 'Revenue Growth',
                tag: 'E-Commerce',
                imgUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
                imgAlt: 'E-commerce dashboard showing growth metrics',
                desc: 'Complete digital transformation including website rebuild, paid advertising, and CRM automation.',
              },
              {
                metric: 10000,
                suffix: '+',
                label: 'Platform Users',
                tag: 'SaaS Startup',
                imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                imgAlt: 'SaaS software platform interface on laptop screen',
                desc: 'Custom-built SaaS platform with automated onboarding and retention sequences.',
              },
              {
                metric: 500,
                suffix: '%',
                label: 'Social Engagement',
                tag: 'Hospitality',
                imgUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                imgAlt: 'Premium hotel lobby interior',
                desc: 'Full social media management and brand refresh across multiple locations.',
              },
              {
                metric: 3,
                suffix: 'x',
                label: 'Lead Generation',
                tag: 'Real Estate',
                imgUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
                imgAlt: 'Modern property exterior for real estate listing',
                desc: 'Property showcase website integrated with CRM and automated lead nurturing.',
              },
            ].map((item, idx) => {
              const resultCardVariants = {
                hidden: cardEntrance.hidden,
                visible: cardEntrance.visible,
                hover: {
                  y: -5,
                  transition: { duration: 0.2, ease: 'easeOut' as const }
                }
              };

              return (
                <motion.div
                  key={idx}
                  variants={resultCardVariants}
                  whileHover="hover"
                  className="overflow-hidden bg-brand-surface border border-brand-border rounded-[4px] flex flex-col text-left group result-card"
                >
                  {/* Aspect-ratio image strip */}
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-brand-surface-2 border-b border-brand-border">
                    <motion.img
                      src={item.imgUrl}
                      alt={item.imgAlt}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={350}
                      className="w-full h-full object-cover"
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    {/* Linear gradient mask overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, transparent 40%, rgba(26,26,26,0.98) 100%)'
                      }}
                    />
                  </div>
                  
                  <div className="p-8 pt-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-brand-yellow leading-none select-none metric">
                          <AnimatedCounter target={item.metric} suffix={item.suffix} />
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 1.7 Closing CTA */}
      <section className="bg-brand-black py-24 px-6 md:px-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-yellow/20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-yellow/20" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-8"
        >
          <h2 className="font-montserrat font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-brand-white leading-tight tracking-[-0.02em] max-w-[720px]">
            Your Competitors Are Not Standing Still.
          </h2>
          <p className="font-dm-sans font-regular text-base md:text-lg text-brand-muted leading-relaxed max-w-[560px]">
            Every day without a connected digital system is a day your competition gains ground. STHEER builds the infrastructure that closes that gap — and keeps it closed.
          </p>
          <Button to="/contact" variant="primary" size="lg">
            Book Your Free Strategy Call
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
