import { BattleResult, BattleCategoryResult } from '@/types/battle.types';

// Pure insight generation functions
const generateCodeWarriorInsights = (
  category: BattleCategoryResult,
  battleResult: BattleResult
): string[] => {
  const { participant1, participant2 } = battleResult;
  const insights: string[] = [];

  if (category.winner === 'participant1') {
    insights.push(
      `${participant1.user.login} has ${participant1.analytics.totalCommits} total commits vs ${participant2.analytics.totalCommits}`
    );
  } else if (category.winner === 'participant2') {
    insights.push(
      `${participant2.user.login} shows higher commit frequency and activity`
    );
  }

  return insights;
};

const generateCommunityChampionInsights = (
  category: BattleCategoryResult,
  battleResult: BattleResult
): string[] => {
  const { participant1, participant2 } = battleResult;
  const insights: string[] = [];

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

  return insights;
};

const generateTechExplorerInsights = (
  category: BattleCategoryResult,
  battleResult: BattleResult
): string[] => {
  const { participant1, participant2 } = battleResult;
  const insights: string[] = [];

  const p1Languages = Object.keys(
    participant1.analytics.languages || {}
  ).length;
  const p2Languages = Object.keys(
    participant2.analytics.languages || {}
  ).length;

  insights.push(`Languages: ${p1Languages} vs ${p2Languages}`);

  return insights;
};

const generateGrowthMasterInsights = (): string[] => {
  return ['Based on account age vs productivity ratio'];
};

const generateImpactPlayerInsights = (
  category: BattleCategoryResult,
  battleResult: BattleResult
): string[] => {
  const { participant1, participant2 } = battleResult;
  const insights: string[] = [];

  const p1Forks = participant1.repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );
  const p2Forks = participant2.repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  insights.push(`Total forks: ${p1Forks} vs ${p2Forks}`);

  return insights;
};

// Insight generator mapping
const insightGenerators: Record<
  string,
  (category: BattleCategoryResult, battleResult: BattleResult) => string[]
> = {
  codeWarrior: generateCodeWarriorInsights,
  communityChampion: generateCommunityChampionInsights,
  techExplorer: generateTechExplorerInsights,
  growthMaster: generateGrowthMasterInsights,
  impactPlayer: generateImpactPlayerInsights,
};

// Main insight generation function
export const generateCategoryInsights = (
  category: BattleCategoryResult,
  battleResult: BattleResult
): string[] => {
  const generator = insightGenerators[category.category.id];
  return generator ? generator(category, battleResult) : [];
};

export const generateInsights = (
  battleResult: BattleResult
): BattleCategoryResult[] => {
  return battleResult.categories.map(category => ({
    ...category,
    insights: generateCategoryInsights(category, battleResult),
  }));
};

// Factory function
export const createBattleInsightGenerator = () => ({
  generateInsights,
  generateCategoryInsights,
});

// Backward compatibility
export class BattleInsightGenerator {
  generateInsights(battleResult: BattleResult): BattleCategoryResult[] {
    return generateInsights(battleResult);
  }
}
