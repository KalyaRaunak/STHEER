import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    need: 'Website',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 5.1 Page Hero */}
      <section className="min-h-[50vh] bg-brand-black flex items-center pt-28 pb-16 px-6 md:px-8 noise-overlay">
        <div className="max-w-[1200px] w-full mx-auto text-left">
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 className="font-montserrat font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-brand-white leading-tight tracking-[-0.03em] max-w-[820px] mb-4">
            Start Building Your<br />Growth System
          </h1>
          <p className="font-dm-sans font-medium text-lg md:text-xl text-brand-yellow max-w-[720px] leading-relaxed">
            Every STHEER engagement begins with a strategy call. Not a sales pitch. A genuine conversation about your business, where it is now, and what infrastructure it needs to get where you want it to go.
          </p>
        </div>
      </section>

      {/* 5.2 Contact Layout */}
      <section className="bg-brand-black py-20 px-6 md:px-8 border-t border-brand-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border p-8 md:p-10 rounded-[4px] text-left">
            <h2 className="font-montserrat font-bold text-2xl text-brand-white mb-8">
              Send Us a Message
            </h2>

            {/* Form state management */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="py-16 text-center flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-brand-yellow/30 flex items-center justify-center text-brand-yellow mb-2 select-none">
                    ✓
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl text-brand-white">
                    Thank You.
                  </h3>
                  <p className="font-dm-sans text-brand-muted text-sm max-w-xs leading-relaxed">
                    We have received your message and will respond within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {error && (
                    <div className="bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-sm p-4 rounded-[2px] font-dm-sans">
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-dm-sans font-medium text-xs text-brand-muted uppercase tracking-[0.08em]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-brand-black border border-brand-white/12 text-brand-white text-sm px-4 py-3.5 rounded-[2px] focus:border-brand-yellow focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-dm-sans font-medium text-xs text-brand-muted uppercase tracking-[0.08em]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-brand-black border border-brand-white/12 text-brand-white text-sm px-4 py-3.5 rounded-[2px] focus:border-brand-yellow focus:outline-none transition-colors"
                      placeholder="name@company.com"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-dm-sans font-medium text-xs text-brand-muted uppercase tracking-[0.08em]">
                      Company / Business Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-brand-black border border-brand-white/12 text-brand-white text-sm px-4 py-3.5 rounded-[2px] focus:border-brand-yellow focus:outline-none transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Needs Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="need" className="font-dm-sans font-medium text-xs text-brand-muted uppercase tracking-[0.08em]">
                      What do you need?
                    </label>
                    <select
                      id="need"
                      name="need"
                      value={formData.need}
                      onChange={handleChange}
                      className="bg-brand-black border border-brand-white/12 text-brand-white text-sm px-4 py-3.5 rounded-[2px] focus:border-brand-yellow focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Website">Website</option>
                      <option value="Growth Marketing">Growth Marketing</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Brand & Design">Brand & Design</option>
                      <option value="CRM/Automation">CRM/Automation</option>
                      <option value="Software/SaaS">Software/SaaS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Project Description */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-dm-sans font-medium text-xs text-brand-muted uppercase tracking-[0.08em]">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-brand-black border border-brand-white/12 text-brand-white text-sm px-4 py-3.5 rounded-[2px] focus:border-brand-yellow focus:outline-none transition-colors min-h-[140px] resize-y"
                      placeholder="Provide details about your project goals, scope, timeline, and current pain points."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full text-center"
                    onClick={() => {}}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col gap-10 text-left">
            
            {/* Book Strategy Call Block */}
            <div className="bg-brand-surface border border-brand-border p-8 rounded-[4px]">
              <div className="flex items-center gap-3 text-brand-yellow mb-4">
                <Calendar className="w-5 h-5" />
                <h3 className="font-montserrat font-bold text-lg text-brand-white mb-0">
                  Prefer to Talk First?
                </h3>
              </div>
              <p className="font-dm-sans text-sm text-brand-off-white/80 leading-relaxed mb-6">
                Book a 30-minute strategy call directly in our calendar. No hard sell. No obligation. Just a focused conversation about what your business needs.
              </p>
              
              {/* Redirect to standard mock calendar link */}
              <Button
                variant="secondary"
                to="/contact"
                onClick={() => {
                  alert("This would typically open your Calendly or booking scheduler modal!");
                }}
                className="w-full"
              >
                Schedule a Call
              </Button>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-brand-border w-full" />

            {/* Direct Details */}
            <div className="flex flex-col gap-6 font-dm-sans">
              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-brand-yellow shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm text-brand-white mb-1">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:info@stheer.co.uk"
                    className="text-base text-brand-white hover:text-brand-yellow border-b border-transparent hover:border-brand-yellow transition-all pb-0.5"
                  >
                    info@stheer.co.uk
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Clock className="w-5 h-5 text-brand-yellow shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm text-brand-white mb-1">
                    Response Times & Hours
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed mb-1">
                    We typically respond within one business day.
                  </p>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Monday to Friday. For urgent enquiries, email is always the fastest route.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
