import { CommitActivity } from './github.types';

export interface CommitChartProps {
  data: CommitActivity[];
  title?: string;
}
