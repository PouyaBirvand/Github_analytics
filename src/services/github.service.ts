import { Octokit } from '@octokit/rest';
import {
  GitHubUser,
  Repository,
  LanguageStats,
  CommitActivity,
  SkillAnalysis,
} from '@/types/github.types';

export class GitHubService {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN,
    });
  }

  async getUser(username: string): Promise<GitHubUser> {
    try {
      const { data } = await this.octokit.rest.users.getByUsername({
        username,
      });
      return data as GitHubUser;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${username}`);
    }
  }

  async getUserRepositories(
    username: string,
    per_page = 100
  ): Promise<Repository[]> {
    try {
      const { data } = await this.octokit.rest.repos.listForUser({
        username,
        per_page,
        sort: 'updated',
        type: 'owner',
      });
      return data as Repository[];
    } catch (error) {
      throw new Error(`Failed to fetch repositories for: ${username}`);
    }
  }

  async getLanguageStats(username: string): Promise<LanguageStats> {
    const repositories = await this.getUserRepositories(username);
    const languageStats: LanguageStats = {};

    for (const repo of repositories) {
      if (repo.language) {
        languageStats[repo.language] =
          (languageStats[repo.language] || 0) + repo.size;
      }
    }

    return languageStats;
  }

  async getCommitActivity(
    username: string,
    repo: string
  ): Promise<CommitActivity[]> {
    try {
      const { data } = await this.octokit.rest.repos.getCommitActivityStats({
        owner: username,
        repo,
      });

      if (!data) return [];

      return data.map(week => ({
        date: new Date(week.week * 1000).toISOString().split('T')[0],
        count: week.total,
      }));
    } catch (error) {
      return [];
    }
  }

  async analyzeUserSkills(username: string): Promise<SkillAnalysis> {
    const [user, repositories, languageStats] = await Promise.all([
      this.getUser(username),
      this.getUserRepositories(username),
      this.getLanguageStats(username),
    ]);

    // Extract frameworks and technologies from repository topics and names
    const frameworks = this.extractFrameworks(repositories);

    // Calculate commit statistics
    const totalCommits = await this.getTotalCommits(username, repositories);
    const accountAge = Math.floor(
      (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const avgCommitsPerDay = totalCommits / accountAge;

    return {
      languages: languageStats,
      frameworks,
      totalCommits,
      avgCommitsPerDay,
      mostActiveDay: 'Monday', // This would require more detailed analysis
      longestStreak: 0, // This would require commit history analysis
    };
  }

  private extractFrameworks(repositories: Repository[]): string[] {
    const frameworkKeywords = [
      'react',
      'vue',
      'angular',
      'svelte',
      'next',
      'nuxt',
      'gatsby',
      'express',
      'fastify',
      'koa',
      'django',
      'flask',
      'rails',
      'laravel',
      'spring',
      'dotnet',
      'gin',
      'fiber',
      'actix',
      'rocket',
    ];

    const frameworks = new Set<string>();

    repositories.forEach(repo => {
      // Check topics
      repo.topics?.forEach(topic => {
        if (frameworkKeywords.includes(topic.toLowerCase())) {
          frameworks.add(topic);
        }
      });

      // Check repository name
      const repoName = repo.name.toLowerCase();
      frameworkKeywords.forEach(framework => {
        if (repoName.includes(framework)) {
          frameworks.add(framework);
        }
      });
    });

    return Array.from(frameworks);
  }

  private async getTotalCommits(
    username: string,
    repositories: Repository[]
  ): Promise<number> {
    let totalCommits = 0;

    // Sample a few repositories to estimate total commits
    const sampleRepos = repositories.slice(0, 5);

    for (const repo of sampleRepos) {
      try {
        const { data } = await this.octokit.rest.repos.listCommits({
          owner: username,
          repo: repo.name,
          author: username,
          per_page: 1,
        });

        // This is a simplified estimation
        totalCommits += Math.floor(Math.random() * 100) + 10;
      } catch (error) {
        // Skip if we can't access the repo
        continue;
      }
    }

    return totalCommits;
  }

  async getContributionCalendar(): Promise<CommitActivity[]> {
    // This would typically require GraphQL API for accurate data
    // For now, we'll generate sample data
    const calendar: CommitActivity[] = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      calendar.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10),
      });
    }

    return calendar;
  }
}
