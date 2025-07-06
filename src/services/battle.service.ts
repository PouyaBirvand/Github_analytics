import { createGitHubService } from './github.service';
import { BattleParticipant, BattleResult } from '@/types/battle.types';
import {
  calculateBattleStats,
  calculateBattle,
} from '@/utils/battle-calculator';
import { generateInsights } from '@/utils/battle-insights';

// Pure function approach
export const createBattle = async (
  username1: string,
  username2: string,
  githubToken?: string
): Promise<BattleResult> => {
  const githubService = createGitHubService(githubToken);

  const [participant1, participant2] = await Promise.all([
    prepareParticipant(username1, githubService),
    prepareParticipant(username2, githubService),
  ]);

  const battleResult = calculateBattle(participant1, participant2);
  const categoriesWithInsights = generateInsights(battleResult);

  return {
    ...battleResult,
    categories: categoriesWithInsights,
    battleId: generateBattleId(username1, username2),
    createdAt: new Date(),
  };
};

const prepareParticipant = async (
  username: string,
  githubService: ReturnType<typeof createGitHubService>
): Promise<BattleParticipant> => {
  const [user, repositories, analytics] = await Promise.all([
    githubService.getUser(username),
    githubService.getUserRepositories(username),
    githubService.analyzeUserSkills(username),
  ]);

  const battleStats = calculateBattleStats(user, repositories, analytics);

  return {
    user,
    repositories,
    analytics,
    battleStats,
  };
};

const generateBattleId = (username1: string, username2: string): string =>
  `${username1}-vs-${username2}-${Date.now()}`;

// Factory function
export const createBattleService = (githubToken?: string) => ({
  createBattle: (username1: string, username2: string) =>
    createBattle(username1, username2, githubToken),
});

// Backward compatibility
export class BattleService {
  private githubToken?: string;

  constructor(githubToken?: string) {
    this.githubToken = githubToken;
  }

  async createBattle(
    username1: string,
    username2: string
  ): Promise<BattleResult> {
    return createBattle(username1, username2, this.githubToken);
  }
}
