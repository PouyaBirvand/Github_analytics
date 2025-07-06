'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg sm:rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="relative p-2 sm:p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg sm:rounded-xl">
            <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            <motion.div
              className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-300" />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            GitHub Analytics
          </span>
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">
            Advanced Insights
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
