'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BattleResult } from '@/types/battle.types';
import { BattleHeader } from '../result/BattleHeader';
import { BattleScoreboard } from '../result/BattleScoreboard';
import { BattleCategoryBreakdown } from '../result/BattleCategoryBreakdown';
import { BattleActions } from '../result/BattleActions';
import { WinnerAnnouncement } from '../result/WinnerAnnouncement';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

interface BattleResultDisplayProps {
  battleResult: BattleResult;
  onNewBattle?: () => void;
}

export const BattleResultDisplay: React.FC<BattleResultDisplayProps> = ({
  battleResult,
  onNewBattle,
}) => {
  return (
    <div className="relative">
      <ParticleBackground />
      <div className="absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BattleHeader battleResult={battleResult} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WinnerAnnouncement battleResult={battleResult} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <BattleScoreboard battleResult={battleResult} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <BattleCategoryBreakdown battleResult={battleResult} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <BattleActions
            battleResult={battleResult}
            onNewBattle={onNewBattle}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
