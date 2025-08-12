'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Zap, Users, Star, Mail, Phone, MapPin, Send, Clock, Shield, CheckCircle, MessageCircle, Calendar, Rocket } from 'lucide-react';
import { sendContactEmail, type ContactFormData } from '../lib/email';
import { useContactForm } from '@/hooks/useContactForm';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const starLayer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starLayer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const starLayer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const starLayer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '95%']);
  const galaxyY = useTransform(scrollYProgress, [0.7, 1], ['100%', '0%']);
  const nebulaY = useTransform(scrollYProgress, [0, 1], ['100%', '200%']);
  const transitionOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // Contact form hook
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;



  return (
    <div className="relative min-h-[500vh] overflow-hidden"
         style={{ 
           paddingTop: 'var(--spacing-5xl)',
           scrollPadding: 'var(--spacing-4xl)' 
         }}>
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
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-white tracking-tight">CodeCraft</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {['Services', 'About', 'Portfolio', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link text-white/90 hover:text-white transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                className="nav-cta ml-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button 
                className="nav-link p-2"
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

      {/* Hero Section */}
      <section className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-card card-padding-xl rounded-3xl mx-auto max-w-6xl"
          >
            <motion.h1 
              className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-spacing-extra-loose leading-[1.1]"
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
              className="hero-description text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/85 text-spacing-extra-loose max-w-5xl mx-auto leading-[1.4] font-light"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-white/60 w-6 h-6" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center text-spacing-extra-loose"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-spacing-loose leading-tight">
              Cosmic Capabilities
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
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
                className="service-card card-padding-md rounded-2xl h-full flex flex-col group"
              >
                <div className="text-white/90 flex justify-center group-hover:text-white transition-colors duration-300">
                  <div className="service-card-icon">
                    {service.icon}
                  </div>
                </div>
                <h3 className="service-card-title text-center">
                  {service.title}
                </h3>
                <p className="service-card-description text-center flex-grow">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing relative min-h-screen flex items-center justify-center z-10">
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="glass-card card-padding-xl rounded-3xl mx-auto max-w-7xl"
          >
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center">
              <div className="text-center lg:text-left">
                <motion.h2 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-spacing-extra-loose leading-[1.1] tracking-tight"
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
                  className="text-xl sm:text-2xl md:text-3xl text-white/85 text-spacing-extra-loose leading-[1.4] font-light max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="block text-spacing-relaxed">With years of experience and a passion for innovation,</span>
                  <span className="block">we transform your ideas into powerful digital solutions that drive growth.</span>
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
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
                      className="feature-item group bg-gradient-to-r from-white/5 to-white/10 rounded-2xl card-padding-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4 lg:justify-start justify-center lg:text-left text-center">
                        <div className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg lg:text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 text-sm lg:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
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
                  className="stat-card rounded-3xl p-12 lg:p-16 text-center max-w-md group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-8 lg:mb-12">
                    <div className="w-28 h-28 lg:w-32 lg:h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400/40 to-blue-500/40 border-2 border-white/40 flex items-center justify-center group-hover:border-white/60 transition-all duration-500 group-hover:rotate-12">
                      <Users className="w-14 h-14 lg:w-16 lg:h-16 text-white/90 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/15 to-blue-500/15 blur-2xl group-hover:blur-3xl transition-all duration-500 group-hover:scale-125"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full opacity-70 group-hover:animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-4 -left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-50 group-hover:animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  
                  <motion.h3 
                    className="text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 mb-6 lg:mb-8 leading-none"
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
                    <p className="text-xl lg:text-2xl font-semibold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
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
      <section className="section-spacing relative flex items-center justify-center z-10" style={{ minHeight: '80vh' }}>
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
              className="contact-form-enhanced rounded-2xl card-padding-lg"
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
                  Share your project details and let's bring your vision to life.
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
                      <p className="text-sm font-medium">{submitStatus.message}</p>
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
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </motion.div>

            {/* Compact Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="contact-info-enhanced"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Let's Connect
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
                  <p className="text-white/70 mb-3 text-sm">
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
                  <p className="text-white/70 mb-3 text-sm">
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
                  <p className="text-white/70 mb-3 text-sm">
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
                <p className="text-green-200/80 text-sm leading-relaxed">
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

      {/* Galaxy Footer - Final destination */}
      <section className="section-spacing relative min-h-screen flex items-center justify-center z-20" 
               style={{ marginTop: '20vh' }}>
        <div className="content-container">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: [0.25, 0.8, 0.25, 1],
              opacity: { duration: 2 }
            }}
            viewport={{ once: true, margin: "-200px" }}
            className="hero-card card-padding-xl rounded-3xl mx-auto max-w-6xl text-center relative"
          >
            {/* Cosmic galaxy atmosphere overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-indigo-600/10 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-spacing-loose leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                viewport={{ once: true }}
              >
                Welcome to the Galaxy
              </motion.h2>
              <motion.p 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 text-spacing-relaxed leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                viewport={{ once: true }}
              >
                You've reached the heart of the cosmos
              </motion.p>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-white/70 text-spacing-extra-loose max-w-4xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
                viewport={{ once: true }}
              >
                From distant stars of innovation to the galactic core of implementation, 
                let's launch your digital dreams into the infinite universe of possibilities.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="btn-primary rounded-full text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                <motion.button
                  className="btn-secondary rounded-full text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10">Explore Portfolio</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>
              
              <motion.p 
                className="text-sm text-white/50 mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                © 2024 Luna Labs. Exploring digital frontiers across the cosmos.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}