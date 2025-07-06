'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  text: string;
  color: string;
}

interface FeatureListProps {
  features: Feature[];
  className?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      viewport={{ once: true }}
      className={`flex flex-wrap justify-center gap-8 text-sm opacity-90 ${className}`}
    >
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-3 h-3 ${feature.color} rounded-full animate-pulse`} />
          <span>{feature.text}</span>
        </div>
      ))}
    </motion.div>
  );
};