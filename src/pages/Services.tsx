import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Globe, TrendingUp, Layers, Pen, CheckCircle, Database, Cpu, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const webRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'web', name: 'Websites & Systems', ref: webRef },
    { id: 'marketing', name: 'Growth Marketing', ref: marketingRef },
    { id: 'social', name: 'Social Media', ref: socialRef },
    { id: 'brand', name: 'Brand & Design', ref: brandRef },
  ];

  const handleTabClick = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    if (ref.current) {
      // Offset for header (72px) + sticky tab bar (52px) = 124px
      const topOffset = ref.current.getBoundingClientRect().top + window.scrollY - 124;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130; // Offset

      for (let i = tabs.length - 1; i >= 0; i--) {
        const tab = tabs[i];
        if (tab.ref.current) {
          const top = tab.ref.current.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (index: number) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };

  const subServices = [
    {
      title: 'Software & SaaS Development',
      icon: <CheckCircle className="w-5 h-5 text-brand-yellow" />,
      desc: 'Bespoke software solutions, software-as-a-service architectures, and customer portal engines designed for speed and long-term modular expansion.',
    },
    {
      title: 'CRM Systems',
      icon: <Database className="w-5 h-5 text-brand-yellow" />,
      desc: 'Deep integrations with Salesforce, HubSpot, and custom database pipelines. We ensure your sales staff have clean pipelines and automated routing.',
    },
    {
      title: 'AI & Automation',
      icon: <Cpu className="w-5 h-5 text-brand-yellow" />,
      desc: 'Automate repetitive workflows, connect databases via serverless webhooks, and build smart, conversational LLM assistants for lead capture.',
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 3.1 Page Hero */}
      <section className="min-h-[50vh] bg-brand-black flex items-center pt-28 pb-16 px-6 md:px-8 noise-overlay">
        <div className="max-w-[1200px] w-full mx-auto text-left">
          <SectionLabel>What We Do</SectionLabel>
          <h1 className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-brand-white leading-tight tracking-[-0.03em] max-w-[820px] mb-4">
            Digital Infrastructure for Scale
          </h1>
          <p className="font-dm-sans font-medium text-lg md:text-xl text-brand-yellow max-w-[640px] mb-8 leading-relaxed">
            Nine integrated services. One connected system. Built to compound your growth.
          </p>
          <p className="font-dm-sans text-base md:text-[17px] text-brand-muted leading-relaxed max-w-[800px]">
            Most businesses do not have a marketing problem. They have an infrastructure problem. Isolated tools, disconnected teams, and campaigns that do not speak to each other create noise without momentum. STHEER builds the infrastructure that makes every part of your digital presence work together — so your investment compounds rather than evaporates.
          </p>
        </div>
      </section>

      {/* 3.2 Sticky Services Navigation */}
      <div className="sticky top-16 md:top-[72px] z-30 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border py-4 px-6 md:px-8 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex gap-4 md:gap-8 overflow-x-auto whitespace-nowrap scrollbar-none justify-start lg:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.ref, tab.id)}
              className={`font-dm-sans font-medium text-sm md:text-base transition-colors pb-1 border-b-2 relative focus:outline-none ${
                activeTab === tab.id
                  ? 'text-brand-yellow border-brand-yellow'
                  : 'text-brand-white/70 border-transparent hover:text-brand-yellow'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3.3 Service 1: Websites & Systems */}
      <div ref={webRef} className="bg-brand-black py-24 px-6 md:px-8 border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-brand-surface border border-brand-border text-brand-yellow rounded-[4px]">
                  <Globe className="w-5 h-5" />
                </span>
                <SectionLabel className="mb-0">Service 01</SectionLabel>
              </div>
              <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight mb-4">
                Your Website Is Not a Brochure.<br />It Is Infrastructure.
              </h2>
              <p className="font-dm-sans font-medium text-base text-brand-yellow mb-6">
                High-converting websites and digital systems built to drive measurable business outcomes.
              </p>
              
              <div className="flex flex-col gap-6 text-brand-off-white/80 font-dm-sans text-sm leading-relaxed max-w-[440px]">
                <p>
                  A website is either an asset or a liability. Most agencies build the latter — beautiful digital brochures that sit in isolation, generating traffic that never converts, and accumulating tech debt. At STHEER, we build websites as core infrastructure.
                </p>
                <p>
                  We design and engineer bespoke web platforms, custom applications, and CRM networks that work together. Your website is the terminal where customer intent meets business operations, converting attention into database records.
                </p>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Button to="/contact" variant="primary">
                Build Your Digital Foundation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 text-left flex flex-col justify-between">
            <div>
              <h3 className="font-montserrat font-bold text-lg text-brand-white uppercase tracking-wider mb-6">
                Core Deliverables
              </h3>
              
              {/* Deliverables list with yellow lines */}
              <ul className="flex flex-col gap-4 mb-12">
                {[
                  'High-converting landing pages and campaign microsites',
                  'Full business websites and e-commerce platforms',
                  'Custom web applications and client portals',
                  'Internal dashboards and business intelligence tools',
                  'Website audits and performance optimisation',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 font-dm-sans text-brand-off-white">
                    <span className="w-4 h-[1px] bg-brand-yellow mt-[11px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Accordion sub-services */}
              <h4 className="font-montserrat font-bold text-sm text-brand-white uppercase tracking-wider mb-4">
                Also within this pillar
              </h4>
              
              <div className="flex flex-col gap-3">
                {subServices.map((sub, idx) => (
                  <div
                    key={idx}
                    className="border border-brand-border rounded-[4px] bg-brand-surface/40 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between p-4 focus:outline-none hover:bg-brand-surface/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {sub.icon}
                        <span className="font-dm-sans font-semibold text-sm text-brand-white">
                          {sub.title}
                        </span>
                      </div>
                      {openAccordion === idx ? (
                        <ChevronUp className="w-4 h-4 text-brand-yellow" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-yellow" />
                      )}
                    </button>
                    
                    {openAccordion === idx && (
                      <div className="p-4 border-t border-brand-border bg-brand-black/40 font-dm-sans text-xs text-brand-muted leading-relaxed">
                        <p className="mb-2">{sub.desc}</p>
                        <a
                          href="/contact"
                          className="text-brand-yellow hover:text-brand-gold font-medium inline-block mt-1"
                        >
                          Learn more &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3.4 Service 2: Growth Marketing */}
      <div ref={marketingRef} className="bg-brand-surface py-24 px-6 md:px-8 border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-brand-black border border-brand-border text-brand-yellow rounded-[4px]">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <SectionLabel className="mb-0">Service 02</SectionLabel>
              </div>
              <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight mb-4">
                Traffic Without Strategy<br />Is Just Noise.
              </h2>
              <p className="font-dm-sans font-medium text-base text-brand-yellow mb-6">
                Strategic paid campaigns, organic search infrastructure, and analytics that turn data into decisions.
              </p>
              
              <div className="flex flex-col gap-6 text-brand-off-white/80 font-dm-sans text-sm leading-relaxed max-w-[440px]">
                <p>
                  Buying traffic is easy; converting that traffic into profitable customer relationships is a science. Most marketing agencies run campaigns in a silo, detached from sales and product metrics. We integrate growth marketing directly into your tech systems.
                </p>
                <p>
                  Through search engine optimization, paid advertising, and clean data pipelines, we route high-intent leads to your conversion funnels. We test continuously, optimizing every node of the journey to ensure your customer acquisition cost compounds downward.
                </p>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Button to="/contact" variant="primary">
                Stop Burning Budget
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 text-left">
            <h3 className="font-montserrat font-bold text-lg text-brand-white uppercase tracking-wider mb-6">
              Core Deliverables
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                'Meta (Facebook & Instagram) and Google paid advertising',
                'Conversion-focused ad creative and copywriting',
                'Technical and on-page SEO',
                'Content strategy and SEO copywriting',
                'Analytics setup, dashboards, and monthly reporting',
                'A/B testing and continuous optimisation',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 font-dm-sans text-brand-off-white">
                  <span className="w-4 h-[1px] bg-brand-yellow mt-[11px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3.5 Service 3: Social Media & Content */}
      <div ref={socialRef} className="bg-brand-black py-24 px-6 md:px-8 border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-brand-surface border border-brand-border text-brand-yellow rounded-[4px]">
                  <Layers className="w-5 h-5" />
                </span>
                <SectionLabel className="mb-0">Service 03</SectionLabel>
              </div>
              <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight mb-4">
                A Following Without Purpose<br />Is Just Noise.
              </h2>
              <p className="font-dm-sans font-medium text-base text-brand-yellow mb-6">
                Content that builds trust, drives engagement, and turns your audience into an asset.
              </p>
              
              <div className="flex flex-col gap-6 text-brand-off-white/80 font-dm-sans text-sm leading-relaxed max-w-[440px]">
                <p>
                  Attention is the currency of the modern web, but attention alone doesn't pay the bills. If your social channels aren't feeding your CRM, you are building on rented land. We construct content engines designed to convert fans into advocates.
                </p>
                <p>
                  We manage and write for the channels where your target market spend their time. By producing high-fidelity photography, graphic assets, and compelling editorial threads, we make your brand the natural choice in your market.
                </p>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Button to="/contact" variant="primary">
                Make Your Social Work
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 text-left">
            <h3 className="font-montserrat font-bold text-lg text-brand-white uppercase tracking-wider mb-6">
              Core Deliverables
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                'Monthly content strategy and calendar planning',
                'Original content creation — photography direction, graphic design, copy',
                'Platform management across Instagram, LinkedIn, Facebook, TikTok',
                'Community engagement and response management',
                'Monthly analytics reporting and strategy review',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 font-dm-sans text-brand-off-white">
                  <span className="w-4 h-[1px] bg-brand-yellow mt-[11px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3.6 Service 4: Brand & Design */}
      <div ref={brandRef} className="bg-brand-surface py-24 px-6 md:px-8 border-b border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-brand-black border border-brand-border text-brand-yellow rounded-[4px]">
                  <Pen className="w-5 h-5" />
                </span>
                <SectionLabel className="mb-0">Service 04</SectionLabel>
              </div>
              <h2 className="font-montserrat font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-brand-white leading-tight tracking-tight mb-4">
                Identity Is Not a Logo.<br />It Is Everything Your Customer<br />Sees Before You Speak.
              </h2>
              <p className="font-dm-sans font-medium text-base text-brand-yellow mb-6">
                Visual identity and marketing design that commands attention, builds trust, and drives action.
              </p>
              
              <div className="flex flex-col gap-6 text-brand-off-white/80 font-dm-sans text-sm leading-relaxed max-w-[440px]">
                <p>
                  A strong brand reduces market friction. It allows you to charge a premium, hires top talent for you, and protects you during downturns. We design visual identities for B2B and consumer brands that command authority.
                </p>
                <p>
                  We construct robust design systems — including typography, colour harmony, digital assets, and print frameworks — that scale as you do. Every touchpoint, from social media layout to physical marketing, speaks with a singular, high-fidelity voice.
                </p>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <Button to="/contact" variant="primary">
                Design a Command Brand
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 text-left">
            <h3 className="font-montserrat font-bold text-lg text-brand-white uppercase tracking-wider mb-6">
              Core Deliverables
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                'Brand identity — logo, colour palette, typography, brand guidelines',
                'Marketing collateral — brochures, presentations, pitch decks',
                'Digital ad creatives — social media, display, video thumbnails',
                'Email marketing templates',
                'Brand refresh and visual identity audits',
                'Standee, flyer, and vinyl design (print production)',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 font-dm-sans text-brand-off-white">
                  <span className="w-4 h-[1px] bg-brand-yellow mt-[11px]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3.7 Services Closing CTA */}
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

export default Services;
