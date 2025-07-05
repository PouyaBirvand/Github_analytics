'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BattleResult } from '@/types/battle.types';
import { CategoryCard } from './CategoryCard';
import { BarChart3 } from 'lucide-react';

interface BattleCategoryBreakdownProps {
  battleResult: BattleResult;
}

export const BattleCategoryBreakdown: React.FC<
  BattleCategoryBreakdownProps
> = ({ battleResult }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="text-center space-y-3 sm:space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
        >
          <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </motion.div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Category Breakdown
        </h3>

        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          Detailed analysis of each battle category and performance metrics
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {battleResult.categories.map((categoryResult, index) => (
          <CategoryCard
            key={categoryResult.category.id}
            categoryResult={categoryResult}
            battleResult={battleResult}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};
