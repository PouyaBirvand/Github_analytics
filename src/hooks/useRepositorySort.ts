'use client';

import { Repository } from '@/types/github.types';
import { useMemo } from 'react';

type SortBy = 'stars' | 'updated' | 'name' | 'forks';

export const useRepositorySort = (
  repositories: Repository[],
  sortBy: SortBy
) => {
  return useMemo(() => {
    return [...repositories].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        case 'name':
          return a.name.localeCompare(b.name);
        case 'forks':
          return b.forks_count - a.forks_count;
        default:
          return 0;
      }
    });
  }, [repositories, sortBy]);
};
