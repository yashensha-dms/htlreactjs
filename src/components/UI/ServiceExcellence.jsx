import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import Button from './Button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const ServiceExcellence = () => {
  return (
    <Section className="bg-[#fafafa]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl"
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.15] mb-6"
        >
          Delivering Service Excellence Through Quality, Safety, and Global Engineering Standards Across India, Middle East & Africa
        </motion.h2>
        
        <motion.p 
          variants={itemVariants} 
          className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-8 max-w-2xl"
        >
          Driven by precision, built on best-in-class standards on every project.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button variant="primary" size="lg" fullWidth>
            Explore Our Services
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default ServiceExcellence;
