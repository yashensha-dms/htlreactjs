import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { cn } from '../../utils/cn';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const metricsContainerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    }
  }
};

const metricItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: "easeIn" } },
};

const MetricItem = ({ base, alt, active }) => {
  const current = active ? alt : base;

  return (
    <motion.div 
      variants={metricItemVariants}
      className="relative flex flex-col items-start w-full pt-4 overflow-hidden"
    >
      {/* Background track line */}
      <div className="h-[1px] w-full bg-white/20 absolute top-0 left-0" />
      
      {/* Filling Progress Line */}
      <motion.div 
        key={active ? "alt-line" : "base-line"}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
        className="h-[2px] bg-brand-red absolute top-0 left-0"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active ? "alt-content" : "base-content"}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-start w-full"
        >
          <span className="text-xs md:text-sm font-medium text-white/70 uppercase tracking-wider h-5 flex items-center">
            {current.label}
          </span>
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-1.5 flex items-baseline h-12 md:h-14">
            <span>{current.value}</span>
            {current.suffix && <span className="ml-0.5">{current.suffix}</span>}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const Hero = ({ sanityData }) => {
  const [showAlt, setShowAlt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlt((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const baseMetrics = sanityData?.metrics && sanityData.metrics.length >= 4
    ? sanityData.metrics.slice(0, 4)
    : [];

  const altMetrics = sanityData?.metrics && sanityData.metrics.length >= 8
    ? sanityData.metrics.slice(4, 8)
    : [];

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-primary">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src={`${import.meta.env.BASE_URL}images/Home page- Header.mp4`} type="video/mp4" />
      </video>

      {/* Dark Overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-1" />
      <div className="absolute inset-0 bg-black/35 z-1" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1440px] h-full mx-auto px-5 md:px-20 flex items-center pb-[120px] md:pb-[140px]">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-elevation-4"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
            Engineering Infrastructure, <br />
            <span className="bg-gradient-to-r from-[#ff1d4e] to-[#ff2b2b] bg-clip-text text-transparent">Delivering Trust.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-base md:text-lg text-peach/90 leading-relaxed mb-8 max-w-xl">
            Delivering integrated MEP services, powering India’s Real Estate with Engineering, supply chain & management solutions.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button variant="primary" size="lg" fullWidth>
              Explore Capabilities
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics Row at the bottom */}
      {baseMetrics.length > 0 && (
        <motion.div 
          variants={metricsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-md border-t border-white/10 py-6 md:py-8 z-10"
        >
          <div className="max-w-[1440px] mx-auto px-5 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {baseMetrics.map((metric, idx) => (
              <MetricItem 
                key={idx}
                base={metric}
                alt={altMetrics[idx] || metric}
                active={showAlt}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
