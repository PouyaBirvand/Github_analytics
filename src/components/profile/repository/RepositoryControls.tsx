'use client';

import React from 'react';
import { ViewModeToggle } from './ViewModeToggle';
import { SortOptions } from './SortOptions';

type SortBy = 'stars' | 'updated' | 'name' | 'forks';

interface RepositoryControlsProps {
  viewMode: 'grid' | 'list';
  sortBy: SortBy;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sortBy: SortBy) => void;
}

export const RepositoryControls: React.FC<RepositoryControlsProps> = ({
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
}) => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-3">
      <ViewModeToggle
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
      <SortOptions
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
    </div>
  );
};
