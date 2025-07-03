'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { popularDevelopers } from '@/lib/constants/developers';
import { PopularDevelopersProps } from '@/types/popular-developer.types';

export const PopularDevelopers: React.FC<PopularDevelopersProps> = ({
  onSearch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="space-y-3 sm:space-y-4 px-4"
    >
      <p className="text-xs sm:text-sm text-muted-foreground">
        Try searching for popular developers:
      </p>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        {popularDevelopers.map((dev, index) => (
          <motion.button
            key={dev.username}
            onClick={() => onSearch(dev.username)}
            className="group relative px-3 py-1.5 sm:px-4 sm:py-2 bg-muted/50 hover:bg-primary/10 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border border-border/50 hover:border-primary/30 min-w-0 flex-shrink-0"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.9 }}
          >
            <span className="relative z-10 group-hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
              {dev.username}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-full transition-all duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="sm:hidden flex justify-center">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
          <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};
