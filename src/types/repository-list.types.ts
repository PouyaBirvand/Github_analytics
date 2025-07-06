import { Repository } from './github.types';

export interface RepositoryListProps {
  repositories: Repository[];
}

export type SortBy = 'stars' | 'updated' | 'name' | 'forks';
export type ViewMode = 'grid' | 'list';
