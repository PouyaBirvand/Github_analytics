'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Star,
  GitFork,
  Code,
  Calendar,
  Filter,
} from 'lucide-react';

type SortBy = 'stars' | 'updated' | 'name' | 'forks';

interface SortOptionsProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export const SortOptions: React.FC<SortOptionsProps> = ({
  sortBy,
  onSortChange,
}) => {
  const sortOptions = [
    { value: 'stars' as const, label: 'Stars', icon: Star },
    { value: 'updated' as const, label: 'Updated', icon: Calendar },
    { value: 'name' as const, label: 'Name', icon: Code },
    { value: 'forks' as const, label: 'Forks', icon: GitFork },
  ];

  return (
    <div className="flex items-center flex-wrap gap-1 p-1 bg-muted/30 rounded-lg">
      <Filter className="w-4 h-4 text-muted-foreground ml-2" />
      {sortOptions.map(option => (
        <Button
          key={option.value}
          variant={sortBy === option.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onSortChange(option.value)}
          className="gap-1 text-xs"
        >
          <option.icon className="w-3 h-3" />
          {option.label}
        </Button>
      ))}
    </div>
  );
};
