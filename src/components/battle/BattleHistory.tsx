'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Users, ExternalLink } from 'lucide-react';
import { BattleResult } from '@/types/battle.types';
import { BattleFormatter } from '@/utils/battle-formatter';
import Image from 'next/image';

interface BattleHistoryItem {
  id: string;
  battleResult: BattleResult;
  timestamp: Date;
}

export const BattleHistory: React.FC = () => {
  const [battles, setBattles] = useState<BattleHistoryItem[]>([]);

  useEffect(() => {
    // Load battle history from localStorage
    const savedBattles = localStorage.getItem('battleHistory');
    if (savedBattles) {
      try {
        const parsed = JSON.parse(savedBattles);
        setBattles(
          parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          }))
        );
      } catch (error) {
        console.error('Error loading battle history:', error);
      }
    }
  }, []);

  const saveBattle = (battleResult: BattleResult) => {
    const newBattle: BattleHistoryItem = {
      id: battleResult.battleId,
      battleResult,
      timestamp: new Date(),
    };

    const updatedBattles = [newBattle, ...battles].slice(0, 10); // Keep only last 10 battles
    setBattles(updatedBattles);

    localStorage.setItem('battleHistory', JSON.stringify(updatedBattles));
  };

  if (battles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 sm:py-16"
      >
        <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-border/50 max-w-md mx-auto">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            No Battles Yet
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Start your first epic battle to see the history here!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="text-center space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          Recent Battles
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Your latest epic developer showdowns
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {battles.map((battle, index) => (
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group bg-background/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            onClick={() => window.open(`/battle/${battle.id}`, '_blank')}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                {/* Fighter 1 */}
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="relative">
                    <Image
                      width={40}
                      height={40}
                      src={battle.battleResult.participant1.user.avatar_url}
                      alt={battle.battleResult.participant1.user.login}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border/50 group-hover:border-primary/50 transition-colors"
                    />
                  </div>
                  <span className="text-foreground font-medium text-sm sm:text-base truncate">
                    {battle.battleResult.participant1.user.login}
                  </span>
                </div>

                {/* VS */}
                <div className="flex-shrink-0 px-2">
                  <span className="text-muted-foreground font-bold text-xs sm:text-sm">
                    VS
                  </span>
                </div>

                {/* Fighter 2 */}
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <div className="relative">
                    <Image
                      width={40}
                      height={40}
                      src={battle.battleResult.participant2.user.avatar_url}
                      alt={battle.battleResult.participant2.user.login}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border/50 group-hover:border-primary/50 transition-colors"
                    />
                  </div>
                  <span className="text-foreground font-medium text-sm sm:text-base truncate">
                    {battle.battleResult.participant2.user.login}
                  </span>
                </div>
              </div>

              {/* Battle Result */}
              <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
                <div className="text-right">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="text-xs sm:text-sm font-semibold">
                      {BattleFormatter.getWinnerName(battle.battleResult)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {battle.timestamp.toLocaleDateString()}
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>

            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
