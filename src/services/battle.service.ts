import { GitHubService } from './github.service';
import { BattleParticipant, BattleResult } from '@/types/battle.types';
import { BattleCalculator } from '@/utils/battle-calculator';
import { BattleInsightGenerator } from '@/utils/battle-insights';

export class BattleService {
  private githubService: GitHubService;
  private calculator: BattleCalculator;
  private insightGenerator: BattleInsightGenerator;

  constructor(githubToken?: string) {
    this.githubService = new GitHubService(githubToken);
    this.calculator = new BattleCalculator();
    this.insightGenerator = new BattleInsightGenerator();
  }

  async createBattle(
    username1: string,
    username2: string
  ): Promise<BattleResult> {
    const [participant1, participant2] = await Promise.all([
      this.prepareParticipant(username1),
      this.prepareParticipant(username2),
    ]);

    const battleResult = this.calculator.calculateBattle(
      participant1,
      participant2
    );
    const categoriesWithInsights =
      this.insightGenerator.generateInsights(battleResult);

    return {
      ...battleResult,
      categories: categoriesWithInsights,
      battleId: this.generateBattleId(username1, username2),
      createdAt: new Date(),
    };
  }

  private async prepareParticipant(
    username: string
  ): Promise<BattleParticipant> {
    const [user, repositories, analytics] = await Promise.all([
      this.githubService.getUser(username),
      this.githubService.getUserRepositories(username),
      this.githubService.analyzeUserSkills(username),
    ]);

    const battleStats = this.calculator.calculateBattleStats(
      user,
      repositories,
      analytics
    );

    return {
      user,
      repositories,
      analytics,
      battleStats,
    };
  }

  private generateBattleId(username1: string, username2: string): string {
    return `${username1}-vs-${username2}-${Date.now()}`;
  }
}
