import { BattleResult, BattleParticipant } from '@/types/battle.types';

// Pure formatting functions
export const formatBattleTitle = (battleResult: BattleResult): string => {
  const { participant1, participant2 } = battleResult;
  return `${participant1.user.login} vs ${participant2.user.login} - Developer Battle`;
};

export const formatBattleDescription = (battleResult: BattleResult): string => {
  const winner = getWinnerName(battleResult);
  const score1 = battleResult.participant1.battleStats.totalScore;
  const score2 = battleResult.participant2.battleStats.totalScore;

  if (battleResult.winner === 'tie') {
    return `Epic tie! Both developers scored ${score1} points in this intense coding battle.`;
  }

  return `${winner} wins with ${Math.max(score1, score2)} points! An epic developer battle between ${battleResult.participant1.user.login} and ${battleResult.participant2.user.login}.`;
};

export const getWinnerName = (battleResult: BattleResult): string => {
  if (battleResult.winner === 'tie') return 'Tie';
  const winner =
    battleResult.winner === 'participant1'
      ? battleResult.participant1
      : battleResult.participant2;
  return winner.user.name || winner.user.login;
};

export const formatScore = (score: number, maxScore: number): string =>
  `${score}/${maxScore}`;

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

const calculateAccountAge = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  const months = Math.floor(diffDays / 30);
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
};

export const formatBattleStats = (
  participant: BattleParticipant
): Record<string, string> => {
  const { user, repositories, analytics } = participant;

  return {
    totalRepos: repositories.length.toString(),
    totalStars: repositories
      .reduce((sum, repo) => sum + repo.stargazers_count, 0)
      .toString(),
    totalForks: repositories
      .reduce((sum, repo) => sum + repo.forks_count, 0)
      .toString(),
    followers: user.followers?.toString() || '0',
    following: user.following?.toString() || '0',
    languages: Object.keys(analytics.languages || {}).length.toString(),
    totalCommits: analytics.totalCommits?.toString() || '0',
    accountAge: calculateAccountAge(user.created_at),
  };
};

// Factory function
export const createBattleFormatter = () => ({
  formatBattleTitle,
  formatBattleDescription,
  getWinnerName,
  formatScore,
  formatPercentage,
  formatBattleStats,
});

// Backward compatibility
export class BattleFormatter {
  static formatBattleTitle = formatBattleTitle;
  static formatBattleDescription = formatBattleDescription;
  static getWinnerName = getWinnerName;
  static formatScore = formatScore;
  static formatPercentage = formatPercentage;
  static formatBattleStats = formatBattleStats;
}
