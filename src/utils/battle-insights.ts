import { BattleResult, BattleCategoryResult } from '@/types/battle.types';

export class BattleInsightGenerator {
  generateInsights(battleResult: BattleResult): BattleCategoryResult[] {
    return battleResult.categories.map(category => ({
      ...category,
      insights: this.generateCategoryInsights(category, battleResult),
    }));
  }

  private generateCategoryInsights(
    category: BattleCategoryResult,
    battleResult: BattleResult
  ): string[] {
    const insights: string[] = [];
    const { participant1, participant2 } = battleResult;

    switch (category.category.id) {
      case 'codeWarrior':
        if (category.winner === 'participant1') {
          insights.push(
            `${participant1.user.login} has ${participant1.analytics.totalCommits} total commits vs ${participant2.analytics.totalCommits}`
          );
        } else if (category.winner === 'participant2') {
          insights.push(
            `${participant2.user.login} shows higher commit frequency and activity`
          );
        }
        break;

      case 'communityChampion':
        const p1Stars = participant1.repositories.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        const p2Stars = participant2.repositories.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        insights.push(`Stars: ${p1Stars} vs ${p2Stars}`);
        insights.push(
          `Followers: ${participant1.user.followers} vs ${participant2.user.followers}`
        );
        break;

      case 'techExplorer':
        const p1Languages = Object.keys(
          participant1.analytics.languages || {}
        ).length;
        const p2Languages = Object.keys(
          participant2.analytics.languages || {}
        ).length;
        insights.push(`Languages: ${p1Languages} vs ${p2Languages}`);
        break;

      case 'growthMaster':
        insights.push('Based on account age vs productivity ratio');
        break;

      case 'impactPlayer':
        const p1Forks = participant1.repositories.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );
        const p2Forks = participant2.repositories.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );
        insights.push(`Total forks: ${p1Forks} vs ${p2Forks}`);
        break;
    }

    return insights;
  }
}
