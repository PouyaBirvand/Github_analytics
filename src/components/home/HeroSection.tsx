'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { SearchForm } from '@/components/search/SearchForm';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GradientText } from '@/components/ui/GradientText';
import { PopularDevelopers } from './PopularDevelopers';
import { HeroSectionProps } from '@/types/hero-section.types';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  loading,
}) => {
  return (
    <section className="relative py-48 md:py-60 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40" />

      <div className="relative z-10 container mx-auto text-center space-y-8 sm:space-y-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <GradientText
                text="GitHub Profile Analytics"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                gradient="from-blue-600 via-purple-600 to-pink-600"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
            >
              Unlock the power of data-driven insights with beautiful
              visualizations, comprehensive analytics, and deep-dive statistics
              for any GitHub developer.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto px-2"
          >
            <SearchForm onSearch={onSearch} loading={loading} variant="hero" />
          </motion.div>
        </motion.div>

        <PopularDevelopers onSearch={onSearch} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs sm:text-sm text-muted-foreground px-4"
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
