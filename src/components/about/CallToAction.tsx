'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BarChart3, ArrowRight, Sparkles, TrendingUp, Zap, Github } from 'lucide-react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

export const CallToAction: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
          {/* Animated Icons */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.div
              animate={{ rotate: 360, y: [-10, 10, -10] }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360, y: [10, -10, 10] }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <TrendingUp className="w-8 h-8 text-green-300" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360, y: [-5, 15, -5] }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <Zap className="w-8 h-8 text-blue-300" />
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Ready to Explore Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                GitHub Journey?
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed"
            >
              Join thousands of developers who've discovered their coding potential through our 
              comprehensive GitHub analytics platform. Start your journey today!
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20"
              >
                <BarChart3 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Start Analyzing Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                View on GitHub
              </Link>
            </motion.div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 text-sm opacity-90"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              <span>Privacy Protected</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8"
          >
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-yellow-300"
              >
                10M+
              </motion.div>
              <p className="text-white/80">Profiles Analyzed</p>
            </div>
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-green-300"
              >
                50K+
              </motion.div>
              <p className="text-white/80">Happy Developers</p>
            </div>
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-blue-300"
              >
                99.9%
              </motion.div>
              <p className="text-white/80">Uptime</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};