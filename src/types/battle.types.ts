import { LucideIcon } from 'lucide-react';
import { GitHubUser, Repository, SkillAnalysis } from './github.types';

export interface BattleParticipant {
  user: GitHubUser;
  repositories: Repository[];
  analytics: SkillAnalysis;
  battleStats: BattleStats;
}

export interface BattleStats {
  codeWarriorScore: number;
  communityChampionScore: number;
  techExplorerScore: number;
  growthMasterScore: number;
  impactPlayerScore: number;
  totalScore: number;
}

export interface BattleCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  maxScore: number;
  description: string;
}

export interface BattleResult {
  participant1: BattleParticipant;
  participant2: BattleParticipant;
  winner: 'participant1' | 'participant2' | 'tie';
  categories: BattleCategoryResult[];
  battleId: string;
  createdAt: Date;
}

export interface BattleCategoryResult {
  category: BattleCategory;
  participant1Score: number;
  participant2Score: number;
  winner: 'participant1' | 'participant2' | 'tie';
  insights: string[];
}

export interface BattleConfig {
  categories: BattleCategory[];
  weights: Record<string, number>;
}
