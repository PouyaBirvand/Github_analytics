'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SearchForm } from '@/components/search/SearchForm';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GradientText } from '@/components/ui/GradientText';
import { PopularDevelopers } from './PopularDevelopers';

interface HeroSectionProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, loading }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40" />
      
      <div className="relative z-10 container mx-auto px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <GradientText
                text="GitHub Profile Analytics"
                className="text-5xl md:text-7xl font-bold"
                gradient="from-blue-600 via-purple-600 to-pink-600"
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Unlock the power of data-driven insights with beautiful visualizations,
              comprehensive analytics, and deep-dive statistics for any GitHub developer.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <SearchForm onSearch={onSearch} loading={loading} variant="hero" />
          </motion.div>
        </motion.div>

        <PopularDevelopers onSearch={onSearch} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center space-x-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Advanced Analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Beautiful Visualizations</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
