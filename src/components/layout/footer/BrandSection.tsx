'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

export const BrandSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="sm:col-span-2 lg:col-span-2"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GitHub Analytics
          </h3>
        </div>
        
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm sm:max-w-md">
          Transform your GitHub data into beautiful, actionable insights.
          Discover patterns, track progress, and showcase your coding
          journey with our advanced analytics platform.
        </p>
        
        <SocialLinks />
      </div>
    </motion.div>
  );
};
