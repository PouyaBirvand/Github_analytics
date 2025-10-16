// src/components/result/BattleActions.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BattleResult } from '@/types/battle.types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';

interface BattleActionsProps {
  battleResult: BattleResult;
  onNewBattle?: () => void;
}

export const BattleActions: React.FC<BattleActionsProps> = ({
  battleResult,
  onNewBattle,
}) => {
  const router = useRouter();

  const handleShare = async () => {
    const shareData = {
      title: `${battleResult.participant1.user.login} vs ${battleResult.participant2.user.login} - Developer Battle`,
      text: `Check out this epic developer battle! ${battleResult.participant1.user.login} vs ${battleResult.participant2.user.login}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleRematch = () => {
    const user1 = battleResult.participant1.user.login;
    const user2 = battleResult.participant2.user.login;
    router.replace(`/battle?user1=${user1}&user2=${user2}`, { scroll: false });
    if (onNewBattle) {
      onNewBattle();
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('battle-result');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${battleResult.participant1.user.login}-vs-${battleResult.participant2.user.login}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="text-center space-y-6 sm:space-y-8"
    >
      <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleShare}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px]"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Battle
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleRematch}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px]"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Rematch
            </Button>
          </motion.div>

          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] backdrop-blur-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </Button>
          </motion.div> */}
        </div>

        {onNewBattle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 pt-6 border-t border-border/30"
          >
            <Button
              onClick={onNewBattle}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/5 px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start New Battle
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};