'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SearchForm } from '@/components/search/SearchForm';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import { DOT_POSITIONS  } from '@/lib/constants/dots';

interface CTASectionProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({ onSearch, loading }) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {DOT_POSITIONS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + dot.delay,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-4 mb-6"
            >
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              <TrendingUp className="w-8 h-8 text-green-300 animate-bounce" />
              <Zap className="w-8 h-8 text-blue-300 animate-pulse" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Unlock Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Coding Potential?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers who've discovered their coding journey through our advanced analytics platform
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <SearchForm onSearch={onSearch} loading={loading} variant="cta" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 text-sm opacity-80"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Instant Results</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
