'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BattleResult } from '@/types/battle.types';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/utils/numberFormat';

import {
  ChartNoAxesCombined,
  Flame,
  Rocket,
  Star,
  Swords,
  Trophy,
} from 'lucide-react';

interface BattleScoreboardProps {
  battleResult: BattleResult;
}

export const BattleScoreboard: React.FC<BattleScoreboardProps> = ({
  battleResult,
}) => {
  const { participant1, participant2 } = battleResult;
  const maxScore = Math.max(
    participant1.battleStats.totalScore,
    participant2.battleStats.totalScore
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 shadow-lg mb-4"
          >
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Final Scores
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Overall performance comparison
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Main Score Comparison */}
          <div className="space-y-4 sm:space-y-6">
            {/* Participant 1 Score */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  <span className="text-foreground font-semibold text-sm sm:text-base">
                    {participant1.user.name || participant1.user.login}
                  </span>
                </div>
                <span className="text-blue-500 font-bold text-xl sm:text-2xl">
                  {formatNumber(participant1.battleStats.totalScore)}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={
                    maxScore > 0
                      ? (participant1.battleStats.totalScore / maxScore) * 100
                      : 0
                  }
                  className="h-3 sm:h-4 bg-muted/30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full" />
              </div>
            </motion.div>

            {/* Participant 2 Score */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  <span className="text-foreground font-semibold text-sm sm:text-base">
                    {participant2.user.name || participant2.user.login}
                  </span>
                </div>
                <span className="text-purple-500 font-bold text-xl sm:text-2xl">
                  {formatNumber(participant2.battleStats.totalScore)}
                </span>
              </div>
              <div className="relative">
                <Progress
                  value={
                    maxScore > 0
                      ? (participant2.battleStats.totalScore / maxScore) * 100
                      : 0
                  }
                  className="h-3 sm:h-4 bg-muted/30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 border-t border-border/30">
            {[
              { key: 'codeWarriorScore', label: 'Code Warrior', icon: Swords },
              { key: 'communityChampionScore', label: 'Community', icon: Star },
              {
                key: 'techExplorerScore',
                label: 'Tech Explorer',
                icon: Rocket,
              },
              {
                key: 'growthMasterScore',
                label: 'Growth',
                icon: ChartNoAxesCombined,
              },
              { key: 'impactPlayerScore', label: 'Impact', icon: Flame },
            ].map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
                className="bg-background/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/30 text-center space-y-2"
              >
                <div className="text-xl sm:text-2xl">
                  <category.icon />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {category.label}
                </div>
                <div className="space-y-1">
                  <div className="text-blue-500 font-bold text-sm sm:text-base">
                    {formatNumber(
                      participant1.battleStats[
                      category.key as keyof typeof participant1.battleStats
                      ] as number
                    )}
                  </div>
                  <div className="text-purple-500 font-bold text-sm sm:text-base">
                    {formatNumber(
                      participant2.battleStats[
                      category.key as keyof typeof participant2.battleStats
                      ] as number
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
