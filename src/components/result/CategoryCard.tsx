'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BattleCategoryResult, BattleResult } from '@/types/battle.types';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Info } from 'lucide-react';

interface CategoryCardProps {
  categoryResult: BattleCategoryResult;
  battleResult: BattleResult;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryResult,
  battleResult,
  index,
}) => {
  const { category, participant1Score, participant2Score, winner, insights } =
    categoryResult;
  const IconComponent = category.icon;

  const getWinnerBadge = () => {
    if (winner === 'tie') {
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
        >
          <Award className="w-3 h-3 mr-1" />
          Tie
        </Badge>
      );
    }

    const winnerUser =
      winner === 'participant1'
        ? battleResult.participant1.user
        : battleResult.participant2.user;

    return (
      <Badge
        variant="default"
        className={`${
          winner === 'participant1'
            ? 'bg-blue-500/20 text-blue-600 border-blue-500/30'
            : 'bg-purple-500/20 text-purple-600 border-purple-500/30'
        }`}
      >
        <TrendingUp className="w-3 h-3 mr-1" />
        {winnerUser.login} wins
      </Badge>
    );
  };

  const getScorePercentage = (score: number) => {
    if (category.maxScore === 0) return 0;
    return (score / category.maxScore) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
      className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl sm:text-4xl p-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20"
          >
            <IconComponent />
          </motion.div>
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-foreground">
              {category.name}
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base">
              {category.description}
            </p>
          </div>
        </div>
        {getWinnerBadge()}
      </div>

      <div className="space-y-6">
        {/* Score Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Participant 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                <span className="text-foreground font-medium text-sm sm:text-base">
                  {battleResult.participant1.user.login}
                </span>
              </div>
              <span className="text-blue-500 font-bold text-sm sm:text-base">
                {participant1Score}/{category.maxScore}
              </span>
            </div>
            <div className="relative">
              <Progress
                value={getScorePercentage(participant1Score)}
                className="h-2 sm:h-3 bg-muted/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full" />
            </div>
          </motion.div>

          {/* Participant 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 + index * 0.1, duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <span className="text-foreground font-medium text-sm sm:text-base">
                  {battleResult.participant2.user.login}
                </span>
              </div>
              <span className="text-purple-500 font-bold text-sm sm:text-base">
                {participant2Score}/{category.maxScore}
              </span>
            </div>
            <div className="relative">
              <Progress
                value={getScorePercentage(participant2Score)}
                className="h-2 sm:h-3 bg-muted/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
            className="pt-4 border-t border-border/30"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-4 h-4 text-primary" />
              <h5 className="text-sm font-semibold text-foreground">
                Key Insights
              </h5>
            </div>
            <ul className="space-y-2">
              {insights.map((insight, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 1.9 + index * 0.1 + i * 0.05,
                    duration: 0.3,
                  }}
                  className="text-sm text-muted-foreground flex items-start space-x-2"
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{insight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
