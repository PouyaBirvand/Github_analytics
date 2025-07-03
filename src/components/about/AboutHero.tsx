'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from '@/components/ui/GradientText';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { BarChart3, Github, TrendingUp } from 'lucide-react';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

      <div className="relative z-10 container mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Animated Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="p-2 sm:p-3 md:p-4 bg-blue-500/10 rounded-full"
            >
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="p-2 sm:p-3 md:p-4 bg-purple-500/10 rounded-full"
            >
              <Github className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="p-2 sm:p-3 md:p-4 bg-pink-500/10 rounded-full"
            >
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-500" />
            </motion.div>
          </div>

          {/* Main Title */}
          <GradientText
            text="About GitHub Analytics"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            gradient="from-blue-600 via-purple-600 to-pink-600"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            Empowering developers worldwide with comprehensive GitHub analytics,
            beautiful visualizations, and actionable insights to accelerate
            their coding journey.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-muted-foreground px-4 sm:px-0"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
              <span>10M+ Profiles Analyzed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
              <span>Real-time Insights</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
              <span>Privacy First</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
