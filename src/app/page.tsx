'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Zap, Users, Mail, Clock, Shield, CheckCircle, MessageCircle, Calendar, Rocket } from 'lucide-react';
import { sendContactEmail, type ContactFormData } from '../lib/email';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    budget: '',
    projectType: '',
    message: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  // Enhanced Parallax transforms for space navigation
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const starLayer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starLayer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const starLayer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const starLayer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '95%']);
  const galaxyY = useTransform(scrollYProgress, [0.7, 1], ['100%', '0%']);
  const nebulaY = useTransform(scrollYProgress, [0, 1], ['100%', '200%']);
  
  // Smooth transition opacity for final section
  const transitionOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // Form handling functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          budget: '',
          projectType: '',
          message: '',
          company: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly at hello@lunalabs.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(max-width: 768px)');
      const update = () => setIsMobile(mq.matches);
      update();
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
  }, []);

  if (!mounted) return null;

  // Portfolio projects (update freely)
  const projects: Array<{
    title: string;
    description: string;
    image?: string;
    href?: string;
  }> = [
    {
      title: 'Dealer Analytics Dashboard',
      description: 'Panel de control para concesionaria: ventas, créditos, stock, autos en taller y DYP. KPIs en tiempo real con filtros por rango de fechas.',
      // Screenshot located in public/dealer-dahboard.png
      image: '/dealer-dahboard.png',
      href: '#contact'
    },
    {
      title: 'E‑commerce Growth Monitor',
      description: 'Conversion tracking, A/B testing health, and inventory signals for scale-ups.',
      href: '#contact'
    },
    {
      title: 'SaaS Billing Console',
      description: 'Stripe-powered metered billing with churn insights and cohort analytics.',
      href: '#contact'
    },
  ];

  return (
    <div id="main" className="relative min-h-[500vh] overflow-hidden"
         style={{ 
           paddingTop: 'var(--spacing-5xl)',
           scrollPadding: 'var(--spacing-4xl)' 
         }}>
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>
      {/* Deep Space Background with Parallax */}
      <motion.div 
        style={{ y: skyY }}
        className="fixed inset-0 space-background"
      />



      {/* Multiple Star Field Layers with Individual Parallax */}
      <motion.div 
        style={{ y: starLayer1Y }}
        className="fixed inset-0"
      >
        <div className="star-field-1" />
      </motion.div>
      
      <motion.div 
        style={{ y: starLayer2Y }}
        className="fixed inset-0"
      >
        <div className="star-field-2" />
      </motion.div>
      
      <motion.div 
        style={{ y: starLayer3Y }}
        className="fixed inset-0"
      >
        <div className="star-field-3" />
      </motion.div>
      
      <motion.div 
        style={{ y: starLayer4Y }}
        className="fixed inset-0"
      >
        <div className="star-field-4" />
      </motion.div>

      {/* Cosmic Nebula Layers for Depth */}
      <motion.div 
        style={{ y: nebulaY }}
        className="fixed inset-0 pointer-events-none"
      >
        {/* High altitude cosmic dust */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" 
             style={{ height: '40vh', top: '20vh' }} />
        {/* Mid-level nebula */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/3 via-transparent to-transparent" 
             style={{ height: '30vh', bottom: '30vh' }} />
        {/* Deep space glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/8 via-purple-500/3 to-transparent" 
             style={{ height: '25vh', bottom: '0vh' }} />
      </motion.div>

      {/* Deep Space Galaxy Floor - Visible at the end */}
      <motion.div 
        style={{ y: galaxyY }}
        className="fixed inset-0"
      >
        <div className="space-floor" />
      </motion.div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" role="navigation" aria-label="Primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="nav-logo flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <a
                  href="#main"
                  className="logo flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
                  aria-label="Luna Lab"
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="13" cy="13" r="9.5" stroke="#EAECEF" strokeWidth="2" />
                    <circle cx="16" cy="10" r="8" fill="#0A0B10" />
                  </svg>
                  <span className="logo-text text-xl lg:text-2xl font-bold text-white tracking-tight">Luna Lab</span>
                </a>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {['Services', 'About', 'Portfolio', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link text-white/90 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a 
                href="#contact"
                className="nav-cta ml-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button 
                className="nav-link p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                  <div className="w-full h-0.5 bg-white rounded"></div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed top-[64px] left-0 right-0 z-50 px-4">
            <div className="mobile-menu mx-2 p-3">
              {['Services', 'About', 'Portfolio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="mobile-menu-item block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a href="#contact" className="mobile-menu-item block" onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
                className="hero-card with-iris card-padding-xl rounded-3xl mx-auto max-w-6xl"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLDivElement;
                  const r = t.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  t.style.setProperty('--x', `${x}%`);
                  t.style.setProperty('--y', `${y}%`);
                }}
          >
            <motion.h1 
              className="hero-title font-bold text-white text-spacing-extra-loose"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="hero-title-line block text-spacing-tight">Exploring Digital</span>
              <span className="hero-title-gradient block">
                Frontiers
              </span>
            </motion.h1>
            
            <motion.p 
              className="hero-description text-white/85 text-spacing-extra-loose max-w-5xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="hero-description-line block text-spacing-relaxed">We are cosmic innovators, navigating the infinite</span>
              <span className="hero-description-line block text-spacing-relaxed">possibilities of technology to create stellar</span>
              <span className="hero-description-line block">software solutions that propel your business to new galaxies.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.button
                className="btn-primary rounded-full text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="btn-secondary rounded-full text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-subtle-float"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-white/60 w-6 h-6" />
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center text-spacing-extra-loose mb-12"
          >
            <h2 className="section-title font-bold text-white text-spacing-loose">
              Featured Work
            </h2>
            <p className="section-subtitle text-white/80 max-w-4xl mx-auto font-light">
              A glimpse into the projects we’ve launched across the cosmos
            </p>
          </motion.div>

          <div className="grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="hero-card with-iris rounded-[24px] overflow-hidden group flex flex-col"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLDivElement;
                  const r = t.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  t.style.setProperty('--x', `${x}%`);
                  t.style.setProperty('--y', `${y}%`);
                }}
              >
                <div className="relative h-56 md:h-64 overflow-hidden rounded-[24px] backdrop-blur-2xl saturate-150">
                  {Array.from({ length: isMobile ? 6 : 9 }).map((_, i) => {
                    const sizePercent = 100 - i * 7; // 100% down to ~44%
                    const maxBlur = isMobile ? 120 : 200;
                    const backdropBlur = Math.round(maxBlur - i * ((maxBlur - 10) / ((isMobile ? 6 : 9) - 1)));
                    return (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 rounded-[24px]"
                        style={{
                          width: `${sizePercent}%`,
                          height: `${sizePercent}%`,
                          transform: 'translate(-50%, -50%)',
                          backdropFilter: `blur(${backdropBlur}px)`,
                          WebkitBackdropFilter: `blur(${backdropBlur}px)`,
                          filter: 'blur(4px)',
                          background: 'rgba(255, 255, 255, 0.10)',
                          zIndex: i + 1,
                        }}
                      />
                    );
                  })}
                  <div
                    className="absolute left-1/2 top-1/2 rounded-[24px] pointer-events-none"
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(255, 255, 255, 0.10)',
                      boxShadow: 'inset 18px 18px 10px -20px #FFFFFF, inset -14px -14px 7px -12px #b3b3b3, 0 6px 24px rgba(0,0,0,.08)',
                      zIndex: 20,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(120% 80% at 20% 10%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0) 60%)',
                      mixBlendMode: 'screen',
                      zIndex: 21,
                    }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 animate-fade-up-minimal">{project.title}</h3>
                  <p className="text-white/75 text-base md:text-lg animate-fade-up-minimal" style={{ animationDelay: `${0.05 * index}s` }}>{project.description}</p>
                </div>
                <div className="px-6 md:px-8 pb-6 md:pb-8 mt-auto">
                  {project.href ? (
                    <a href={project.href} className="btn-secondary rounded-full text-white w-full inline-flex justify-center">View Case Study</a>
                  ) : (
                    <button className="btn-secondary rounded-full text-white w-full">View Case Study</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center text-spacing-extra-loose"
          >
            <h2 className="section-title font-bold text-white text-spacing-loose">
              Cosmic Capabilities
            </h2>
            <p className="section-subtitle text-white/80 max-w-4xl mx-auto font-light">
              From nebula concepts to stellar deployments, we navigate the cosmos of code
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "Galactic Development",
                description: "Interstellar web applications engineered with quantum-level precision and cosmic technologies"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Nebula Design",
                description: "Breathtaking, cosmic interfaces that transport users through stellar user experiences"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Warp Speed",
                description: "Light-speed applications optimized for hyperdrive performance across the universe"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="service-card with-iris card-padding-md rounded-2xl h-full flex flex-col group"
                onMouseMove={(e) => {
                  const t = e.currentTarget as HTMLDivElement;
                  const r = t.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  t.style.setProperty('--x', `${x}%`);
                  t.style.setProperty('--y', `${y}%`);
                }}
              >
                <div className="text-white/90 flex justify-center group-hover:text-white transition-colors duration-300">
                  <div className="service-card-icon">
                    {service.icon}
                  </div>
                </div>
                <h3 className="service-card-title text-center animate-fade-up-minimal">
                  {service.title}
                </h3>
                <p className="service-card-description text-center flex-grow animate-fade-up-minimal" style={{ animationDelay: `${0.05 * index}s` }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="glass-card card-padding-xl rounded-3xl mx-auto max-w-6xl"
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-center">
              <div className="text-center lg:text-left">
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-spacing-loose leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="block text-spacing-tight">Why Choose</span>
                  <span className="block bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                    Us?
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-white/85 text-spacing-relaxed leading-relaxed font-light max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="block">We turn ideas into fast, scalable products that drive growth.</span>
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: "🚀", title: "Expert Development Team", desc: "Seasoned professionals with cutting-edge expertise" },
                    { icon: "⚡", title: "Agile Project Management", desc: "Fast, flexible delivery with continuous collaboration" },
                    { icon: "🛡️", title: "24/7 Support & Maintenance", desc: "Round-the-clock assistance and system optimization" },
                    { icon: "📈", title: "Scalable Architecture", desc: "Future-ready solutions that grow with your business" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="feature-item group bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3 lg:justify-start justify-center lg:text-left text-center">
                        <div className="text-2xl lg:text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm lg:text-base font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 text-xs lg:text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <motion.div 
                  className="stat-card with-iris rounded-3xl p-8 lg:p-10 text-center max-w-md group animate-fade-up-minimal"
                  onMouseMove={(e) => {
                    const t = e.currentTarget as HTMLDivElement;
                    const r = t.getBoundingClientRect();
                    const x = ((e.clientX - r.left) / r.width) * 100;
                    const y = ((e.clientY - r.top) / r.height) * 100;
                    t.style.setProperty('--x', `${x}%`);
                    t.style.setProperty('--y', `${y}%`);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-6 lg:mb-8">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full bg-gradient-to-br from-purple-400/40 to-blue-500/40 border-2 border-white/40 flex items-center justify-center group-hover:border-white/60 transition-all duration-500 group-hover:rotate-12">
                      <Users className="w-12 h-12 lg:w-14 lg:h-14 text-white/90 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/15 to-blue-500/15 blur-2xl group-hover:blur-3xl transition-all duration-500 group-hover:scale-125"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full opacity-70 group-hover:animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-4 -left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-50 group-hover:animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  
                  <motion.h3 
                    className="text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 mb-4 lg:mb-6 leading-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    500+
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-lg lg:text-xl font-semibold text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
                      Projects Delivered
                    </p>
                    <p className="text-white/60 text-sm lg:text-base group-hover:text-white/70 transition-colors duration-300">
                      Across global industries
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="section-spacing relative flex items-center justify-center z-10" style={{ minHeight: '80vh' }}>
        <div className="content-container">
          {/* Compact Hero Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-hero text-center relative z-10"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Launch?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transform your vision into stellar digital reality.
            </motion.p>

            {/* Compact Trust Badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mt-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="trust-badge">
                <Shield className="trust-badge-icon" />
                <span>Confidential</span>
              </div>
              <div className="trust-badge">
                <Clock className="trust-badge-icon" />
                <span>24h Response</span>
              </div>
              <div className="trust-badge">
                <CheckCircle className="trust-badge-icon" />
                <span>500+ Projects</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Compact Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            className="contact-form-enhanced with-iris rounded-2xl card-padding-lg"
            onMouseMove={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              target.style.setProperty('--x', `${x}%`);
              target.style.setProperty('--y', `${y}%`);
            }}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Start Your Mission
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Share your project details and let&#39;s bring your vision to life.
                </p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="form-group-enhanced"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="form-label-enhanced">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="form-input-enhanced"
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div 
                    className="form-group-enhanced"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="form-label-enhanced">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="form-input-enhanced"
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="form-group-enhanced"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="budget" className="form-label-enhanced">Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-input-enhanced"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select Range</option>
                      <option value="5k-15k">$5k - $15k</option>
                      <option value="15k-50k">$15k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                    </select>
                  </motion.div>

                  <motion.div 
                    className="form-group-enhanced"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="projectType" className="form-label-enhanced">Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-input-enhanced"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select Type</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile-app">Mobile Application</option>
                      <option value="website">Website</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div 
                  className="form-group-enhanced"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="form-label-enhanced">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project vision, goals, and requirements..."
                    className="form-textarea-enhanced"
                    rows={4}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </motion.div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-200' 
                        : 'bg-red-500/10 border-red-500/20 text-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Mail className="w-5 h-5 text-red-400" />
                      )}
                      <p className="text-base md:text-lg font-medium">{submitStatus.message}</p>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary rounded-full text-white w-full relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Launching...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        Launch Project
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </form>
            </motion.div>

            {/* Compact Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="contact-info-enhanced with-iris"
              onMouseMove={(e) => {
                const t = e.currentTarget as HTMLDivElement;
                const r = t.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                t.style.setProperty('--x', `${x}%`);
                t.style.setProperty('--y', `${y}%`);
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Let&#39;s Connect
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Choose your preferred way to reach us.
                </p>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="contact-method group"
                >
                  <div className="contact-icon-enhanced">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                  <p className="text-white/70 mb-3 text-base md:text-lg">
                    24-hour response guarantee
                  </p>
                  <a 
                    href="mailto:hello@lunalabs.com" 
                    className="text-purple-300 hover:text-purple-200 transition-colors duration-300 font-semibold inline-flex items-center gap-2"
                  >
                    hello@lunalabs.com
                    <ArrowDown className="w-3 h-3 rotate-[-45deg] group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform duration-300" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="contact-method group"
                >
                  <div className="contact-icon-enhanced">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Live Chat</h4>
                  <p className="text-white/70 mb-3 text-base md:text-lg">
                    Instant answers during business hours
                  </p>
                  <div className="text-purple-300 font-semibold inline-flex items-center gap-2">
                    9 AM - 6 PM EST
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  className="contact-method group"
                >
                  <div className="contact-icon-enhanced">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">Free Consultation</h4>
                  <p className="text-white/70 mb-3 text-base md:text-lg">
                    30-minute strategy call
                  </p>
                  <button className="text-purple-300 hover:text-purple-200 transition-colors duration-300 font-semibold inline-flex items-center gap-2 group/btn">
                    Book Call
                    <ArrowDown className="w-3 h-3 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:translate-y-[-1px] transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>

              {/* Compact Guarantee */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-white">24h Response Guarantee</h4>
                </div>
                <p className="text-green-200/80 text-base md:text-lg leading-relaxed">
                  Most inquiries receive a detailed reply within 4 hours.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition Space - Gradual descent */}
      <div className="relative z-10" style={{ height: '150vh' }}>
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(16, 7, 39, 0.2) 30%, rgba(16, 7, 39, 0.4) 60%, rgba(16, 7, 39, 0.6) 100%)',
            opacity: transitionOpacity
          }}
        />
        
        {/* Floating cosmic elements for smoother transition */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: transitionOpacity }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-300 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-indigo-100 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </div>
      
    </div>
  );
}