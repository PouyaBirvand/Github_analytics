import { BattleResult, BattleParticipant } from '@/types/battle.types';

export class BattleFormatter {
  static formatBattleTitle(battleResult: BattleResult): string {
    const { participant1, participant2 } = battleResult;
    return `${participant1.user.login} vs ${participant2.user.login} - Developer Battle`;
  }

  static formatBattleDescription(battleResult: BattleResult): string {
    const winner = this.getWinnerName(battleResult);
    const score1 = battleResult.participant1.battleStats.totalScore;
    const score2 = battleResult.participant2.battleStats.totalScore;

    if (battleResult.winner === 'tie') {
      return `Epic tie! Both developers scored ${score1} points in this intense coding battle.`;
    }

    return `${winner} wins with ${Math.max(score1, score2)} points! An epic developer battle between ${battleResult.participant1.user.login} and ${battleResult.participant2.user.login}.`;
  }

  static getWinnerName(battleResult: BattleResult): string {
    if (battleResult.winner === 'tie') return 'Tie';

    const winner =
      battleResult.winner === 'participant1'
        ? battleResult.participant1
        : battleResult.participant2;

    return winner.user.name || winner.user.login;
  }

  static formatScore(score: number, maxScore: number): string {
    return `${score}/${maxScore}`;
  }

  static formatPercentage(value: number, total: number): string {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  }

  static formatBattleStats(
    participant: BattleParticipant
  ): Record<string, string> {
    const { user, repositories, analytics, battleStats } = participant;

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
      accountAge: this.calculateAccountAge(user.created_at),
    };
  }

  private static calculateAccountAge(createdAt: string): string {
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
  }
}
