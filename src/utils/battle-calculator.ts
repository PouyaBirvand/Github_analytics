import { GitHubUser, Repository, SkillAnalysis } from '@/types/github.types';
import {
  BattleStats,
  BattleParticipant,
  BattleResult,
  BattleConfig,
} from '@/types/battle.types';
import { ChartNoAxesCombined, Flame, Rocket, Star, Swords } from 'lucide-react';

// Configuration
const DEFAULT_BATTLE_CONFIG: BattleConfig = {
  categories: [
    {
      id: 'codeWarrior',
      name: 'Code Warrior',
      icon: Swords,
      maxScore: 25,
      description: 'Commits, frequency, and active repositories',
    },
    {
      id: 'communityChampion',
      name: 'Community Champion',
      icon: Star,
      maxScore: 20,
      description: 'Stars, followers, and public repositories',
    },
    {
      id: 'techExplorer',
      name: 'Tech Explorer',
      icon: Rocket,
      maxScore: 20,
      description: 'Language diversity and framework variety',
    },
    {
      id: 'growthMaster',
      name: 'Growth Master',
      icon: ChartNoAxesCombined,
      maxScore: 15,
      description: 'Account age vs productivity ratio',
    },
    {
      id: 'impactPlayer',
      name: 'Impact Player',
      icon: Flame,
      maxScore: 20,
      description: 'Forks, watchers, and community impact',
    },
  ],
  weights: {
    codeWarrior: 0.25,
    communityChampion: 0.2,
    techExplorer: 0.2,
    growthMaster: 0.15,
    impactPlayer: 0.2,
  },
};

// Pure calculation functions
const calculateCodeWarriorScore = (
  user: GitHubUser,
  repositories: Repository[],
  analytics: SkillAnalysis
): number => {
  const totalCommits = analytics.totalCommits || 0;
  const avgCommitsPerDay = analytics.avgCommitsPerDay || 0;
  const activeRepos = repositories.filter(
    repo =>
      new Date(repo.updated_at) >
      new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  ).length;

  const commitScore = Math.min((totalCommits / 1000) * 10, 10);
  const frequencyScore = Math.min(avgCommitsPerDay * 5, 8);
  const activityScore = Math.min(activeRepos * 0.5, 7);

  return Math.round(commitScore + frequencyScore + activityScore);
};

const calculateCommunityChampionScore = (
  user: GitHubUser,
  repositories: Repository[]
): number => {
  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const followers = user.followers || 0;
  const publicRepos = user.public_repos || 0;

  const starsScore = Math.min((totalStars / 100) * 8, 8);
  const followersScore = Math.min((followers / 50) * 7, 7);
  const reposScore = Math.min((publicRepos / 20) * 5, 5);

  return Math.round(starsScore + followersScore + reposScore);
};

const calculateTechExplorerScore = (
  analytics: SkillAnalysis,
  repositories: Repository[]
): number => {
  const languageCount = Object.keys(analytics.languages || {}).length;
  const frameworkCount = analytics.frameworks?.length || 0;
  const recentActivity = repositories.filter(
    repo =>
      new Date(repo.updated_at) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  const languageScore = Math.min(languageCount * 1.5, 8);
  const frameworkScore = Math.min(frameworkCount * 1, 7);
  const activityScore = Math.min(recentActivity * 0.5, 5);

  return Math.round(languageScore + frameworkScore + activityScore);
};

const calculateGrowthMasterScore = (
  user: GitHubUser,
  analytics: SkillAnalysis
): number => {
  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  const avgCommitsPerDay = analytics.avgCommitsPerDay || 0;
  const productivity = avgCommitsPerDay * 365;

  const ageScore = Math.min((accountAge / 365) * 2, 5);
  const productivityScore = Math.min(productivity / 100, 10);

  return Math.round(ageScore + productivityScore);
};

const calculateImpactPlayerScore = (repositories: Repository[]): number => {
  const totalForks = repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );
  const totalWatchers = repositories.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0
  );
  const hasOrganizations = repositories.some(
    repo => repo.owner.type === 'Organization'
  );

  const forksScore = Math.min((totalForks / 50) * 8, 8);
  const watchersScore = Math.min((totalWatchers / 100) * 7, 7);
  const orgScore = hasOrganizations ? 5 : 0;

  return Math.round(forksScore + watchersScore + orgScore);
};

// Main calculation functions
export const calculateBattleStats = (
  user: GitHubUser,
  repositories: Repository[],
  analytics: SkillAnalysis
): BattleStats => {
  const codeWarriorScore = calculateCodeWarriorScore(user, repositories, analytics);
  const communityChampionScore = calculateCommunityChampionScore(user, repositories);
  const techExplorerScore = calculateTechExplorerScore(analytics, repositories);
  const growthMasterScore = calculateGrowthMasterScore(user, analytics);
  const impactPlayerScore = calculateImpactPlayerScore(repositories);

  const totalScore =
    codeWarriorScore +
    communityChampionScore +
    techExplorerScore +
    growthMasterScore +
    impactPlayerScore;

  return {
    codeWarriorScore,
    communityChampionScore,
    techExplorerScore,
    growthMasterScore,
    impactPlayerScore,
    totalScore,
  };
};

export const calculateBattle = (
  participant1: BattleParticipant,
  participant2: BattleParticipant,
  config: BattleConfig = DEFAULT_BATTLE_CONFIG
): BattleResult => {
  const categories = config.categories.map(category => {
    const p1Score = participant1.battleStats[
      `${category.id}Score` as keyof BattleStats
    ] as number;
    const p2Score = participant2.battleStats[
      `${category.id}Score` as keyof BattleStats
    ] as number;

    let winner: 'participant1' | 'participant2' | 'tie';
    if (p1Score > p2Score) winner = 'participant1';
    else if (p2Score > p1Score) winner = 'participant2';
    else winner = 'tie';

    return {
      category,
      participant1Score: p1Score,
      participant2Score: p2Score,
      winner,
      insights: [],
    };
  });

  const overallWinner =
    participant1.battleStats.totalScore > participant2.battleStats.totalScore
      ? 'participant1'
      : participant2.battleStats.totalScore > participant1.battleStats.totalScore
        ? 'participant2'
        : 'tie';

  return {
    participant1,
    participant2,
    winner: overallWinner,
    categories,
    battleId: '',
    createdAt: new Date(),
  };
};

// Factory function
export const createBattleCalculator = (config: BattleConfig = DEFAULT_BATTLE_CONFIG) => ({
  calculateBattleStats,
  calculateBattle: (p1: BattleParticipant, p2: BattleParticipant) => 
    calculateBattle(p1, p2, config),
  config,
});

// Backward compatibility
export class BattleCalculator {
  private config: BattleConfig;

  constructor(config: BattleConfig = DEFAULT_BATTLE_CONFIG) {
    this.config = config;
  }

  calculateBattleStats(
    user: GitHubUser,
    repositories: Repository[],
    analytics: SkillAnalysis
  ): BattleStats {
    return calculateBattleStats(user, repositories, analytics);
  }

  calculateBattle(
    participant1: BattleParticipant,
    participant2: BattleParticipant
  ): BattleResult {
    return calculateBattle(participant1, participant2, this.config);
  }
}
