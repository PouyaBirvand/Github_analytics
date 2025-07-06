'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RepositoryCard } from './RepositoryCard';
import { Repository } from '@/types/github.types';

interface RepositoryGridProps {
  repositories: Repository[];
  viewMode: 'grid' | 'list';
  sortBy: string;
}

export const RepositoryGrid: React.FC<RepositoryGridProps> = ({
  repositories,
  viewMode,
  sortBy,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${viewMode}-${sortBy}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {repositories.map((repo, index) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
            index={index}
            viewMode={viewMode}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
