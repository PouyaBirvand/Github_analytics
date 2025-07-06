'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RepositoryListProps } from '@/types/repository-list.types';
import { RepositoryHeader } from './RepositoryHeader';
import { RepositoryControls } from './RepositoryControls';
import { RepositoryGrid } from './RepositoryGrid';
import { ShowMoreButton } from './ShowMoreButton';
import { useRepositorySort } from '@/hooks/useRepositorySort';

type SortBy = 'stars' | 'updated' | 'name' | 'forks';

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>('stars');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortedRepos = useRepositorySort(repositories, sortBy);
  const displayedRepos = showAll ? sortedRepos : sortedRepos.slice(0, 6);

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <RepositoryHeader />
            <RepositoryControls
              viewMode={viewMode}
              sortBy={sortBy}
              onViewModeChange={handleViewModeChange}
              onSortChange={handleSortChange}
            />
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <RepositoryGrid
            repositories={displayedRepos}
            viewMode={viewMode}
            sortBy={sortBy}
          />

          {repositories.length > 6 && (
            <ShowMoreButton
              showAll={showAll}
              totalCount={repositories.length}
              onToggle={handleToggleShowAll}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
