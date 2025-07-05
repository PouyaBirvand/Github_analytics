'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Star, Rocket, TrendingUp, Flame } from 'lucide-react';

const battleCategories = [
  {
    icon: Sword,
    name: 'Code Warrior',
    description: 'Commits & Activity',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Star,
    name: 'Community Champion',
    description: 'Stars & Followers',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Rocket,
    name: 'Tech Explorer',
    description: 'Languages & Frameworks',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    name: 'Growth Master',
    description: 'Productivity & Growth',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Flame,
    name: 'Impact Player',
    description: 'Forks & Community Impact',
    color: 'from-purple-500 to-pink-500',
  },
];

export const BattlePreview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="text-center space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Battle Categories
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Developers will compete across these epic categories to determine the
          ultimate coding champion
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {battleCategories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div
                    className={`inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r ${category.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Battle stats preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xs sm:text-sm text-muted-foreground px-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Real-time Comparison</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Detailed Analytics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span>Interactive Results</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
