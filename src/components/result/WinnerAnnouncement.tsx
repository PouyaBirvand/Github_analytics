'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, Swords } from 'lucide-react';
import { BattleResult } from '@/types/battle.types';
import { ParticleBackground } from '../ui/ParticleBackground';
import { formatNumber } from '@/utils/numberFormat';

interface WinnerAnnouncementProps {
  battleResult: BattleResult;
}

export const WinnerAnnouncement: React.FC<WinnerAnnouncementProps> = ({
  battleResult,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getWinnerInfo = () => {
    if (battleResult.winner === 'tie') {
      return {
        title: 'Epic Tie!',
        subtitle:
          'Both developers are equally matched in this legendary battle!',
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'from-yellow-500/20 to-orange-500/20',
        icon: Medal,
      };
    }

    const winner =
      battleResult.winner === 'participant1'
        ? battleResult.participant1
        : battleResult.participant2;

    return {
      title: `${winner.user.name || winner.user.login} Wins!`,
      subtitle: `@${winner.user.login} emerges victorious in this epic battle!`,
      color:
        battleResult.winner === 'participant1'
          ? 'from-blue-500 to-cyan-500'
          : 'from-purple-500 to-pink-500',
      bgColor:
        battleResult.winner === 'participant1'
          ? 'from-blue-500/20 to-cyan-500/20'
          : 'from-purple-500/20 to-pink-500/20',
      icon: Crown,
    };
  };

  const winnerInfo = getWinnerInfo();
  const IconComponent = winnerInfo.icon;

  // نسبت برد بر حسب درصد (فرمت ساده)
  const totalScoreSum =
    battleResult.participant1.battleStats.totalScore +
    battleResult.participant2.battleStats.totalScore;

  const winRatio =
    battleResult.winner === 'tie'
      ? '50/50'
      : battleResult.winner === 'participant1'
      ? `${Math.round(
          (battleResult.participant1.battleStats.totalScore / totalScoreSum) *
            100
        )}%`
      : `${Math.round(
          (battleResult.participant2.battleStats.totalScore / totalScoreSum) *
            100
        )}%`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 200 }}
      className="text-center relative"
    >
      {/* Confetti Animation */}
      {showConfetti && battleResult.winner !== 'tie' && (
        <div className="absolute inset-0 z-[9999] pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: -20,
                x: Math.random() * 600 - 300,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                opacity: 0,
                y: 200,
                rotate: Math.random() * 720,
                x: Math.random() * 600 - 300,
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 1,
                ease: 'easeOut',
              }}
              className={`absolute top-0 left-1/2 w-3 h-3 rounded-full ${
                ['bg-yellow-400', 'bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-red-400'][i % 5]
              }`}
            />
          ))}
        </div>
      )}

      {/* Sparkles Background */}
      <ParticleBackground />

      <motion.div
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, duration: 1 }}
        className={`bg-gradient-to-br ${winnerInfo.bgColor} backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-border/50 shadow-2xl inline-block relative overflow-hidden`}
      >
        {/* Background Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${winnerInfo.color} opacity-5 blur-3xl`}
        />

        <div className="relative z-10">
          {/* Winner Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 300 }}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`p-4 rounded-full bg-gradient-to-r ${winnerInfo.color} shadow-lg`}
            >
              <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Winner Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${winnerInfo.color} bg-clip-text text-transparent`}
          >
            {winnerInfo.title}
          </motion.h2>

          {/* Winner Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-md mx-auto"
          >
            {winnerInfo.subtitle}
          </motion.p>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex justify-center items-center space-x-8 sm:space-x-12"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2"
              >
                {formatNumber(
                  battleResult.participant1.battleStats.totalScore
                )}
              </motion.div>
              <div className="text-muted-foreground text-sm sm:text-base font-medium">
                {battleResult.participant1.user.login}
              </div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-2xl sm:text-3xl"
            >
              <Swords size={45} />
            </motion.div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-3xl sm:text-4xl font-bold text-purple-500 mb-2"
              >
                {formatNumber(
                  battleResult.participant2.battleStats.totalScore
                )}
              </motion.div>
              <div className="text-muted-foreground text-sm sm:text-base font-medium">
                {battleResult.participant2.user.login}
              </div>
            </div>
          </motion.div>

          {/* Battle Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-border/30"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl font-bold text-foreground">
                  {formatNumber(battleResult.categories.length)}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Categories
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-foreground">
                  {formatNumber(
                    Math.abs(
                      battleResult.participant1.battleStats.totalScore -
                        battleResult.participant2.battleStats.totalScore
                    )
                  )}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Point Difference
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-foreground">
                  {winRatio}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Win Ratio
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
