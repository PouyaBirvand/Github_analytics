'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CTAContentProps {
  title: React.ReactNode;
  description: string;
  className?: string;
}

export const CTAContent: React.FC<CTAContentProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};