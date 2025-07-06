'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
  Github,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/animations/AnimatedBackground';
import { AnimatedIcon } from '@/components/ui/animations/AnimatedIcon';
import { CTAContent } from './CTAContent';
import { CTAButton } from './CTAButton';
import { FeatureList } from './FeatureList';
import { StatsGrid } from '@/components/ui/stats/StatsGrid';

const ANIMATED_ICONS = [
  { Icon: Sparkles, color: 'text-yellow-300', rotationDuration: 20, floatRange: [-10, 10, -10] as [number, number, number] },
  { Icon: TrendingUp, color: 'text-green-300', rotationDuration: -25, floatRange: [10, -10, 10] as [number, number, number] },
  { Icon: Zap, color: 'text-blue-300', rotationDuration: 30, floatRange: [-5, 15, -5] as [number, number, number] },
];

const FEATURES = [
  { text: '100% Free Forever', color: 'bg-green-400' },
  { text: 'No Registration Required', color: 'bg-blue-400' },
  { text: 'Instant Results', color: 'bg-purple-400' },
  { text: 'Privacy Protected', color: 'bg-yellow-400' },
];

const STATS = [
  { value: '10M+', label: 'Profiles Analyzed', color: 'text-yellow-300' },
  { value: '50K+', label: 'Happy Developers', color: 'text-green-300' },
  { value: '99.9%', label: 'Uptime', color: 'text-blue-300' },
];

export const CallToAction: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Animated Icons */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            {ANIMATED_ICONS.map((iconConfig, index) => (
              <AnimatedIcon
                key={index}
                Icon={iconConfig.Icon}
                color={iconConfig.color}
                rotationDuration={Math.abs(iconConfig.rotationDuration)}
                floatRange={iconConfig.floatRange}
              />
            ))}
          </motion.div>

          {/* Main Content */}
          <CTAContent
            title={
              <>
                Ready to Explore Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                  GitHub Journey?
                </span>
              </>
            }
            description="Join thousands of developers who've discovered their coding potential through our comprehensive GitHub analytics platform. Start your journey today!"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <CTAButton
              href="/"
              variant="primary"
              Icon={BarChart3}
              TrailingIcon={ArrowRight}
            >
              Start Analyzing Now
              </CTAButton>
            
            <CTAButton
              href="https://github.com"
              variant="secondary"
              Icon={Github}
              external
            >
              View on GitHub
            </CTAButton>
          </motion.div>

          {/* Features List */}
          <FeatureList features={FEATURES} />

          {/* Stats */}
          <StatsGrid stats={STATS} />
        </motion.div>
      </div>
    </section>
  );
};