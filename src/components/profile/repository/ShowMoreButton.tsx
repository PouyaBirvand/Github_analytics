'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ShowMoreButtonProps {
  showAll: boolean;
  totalCount: number;
  onToggle: () => void;
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  showAll,
  totalCount,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-8 text-center"
    >
      <Button
        variant="outline"
        onClick={onToggle}
        className="group gap-2 px-6 py-3 bg-gradient-to-r from-background to-muted/30 hover:shadow-lg transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: showAll ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {showAll ? '↑' : '↓'}
        </motion.div>
        {showAll ? 'Show Less' : `Show All ${totalCount} Repositories`}
      </Button>
    </motion.div>
  );
};
