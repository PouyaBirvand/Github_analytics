// src/services/github.service.ts - نسخه اصلاح شده

import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import {
  GitHubUser,
  Repository,
  LanguageStats,
  CommitActivity,
  SkillAnalysis,
} from '@/types/github.types';

// ✅ In-Memory Cache
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const cache = new Map<string, { data: any; timestamp: number }>();

function getCached(key: string) {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
}

function setCached(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(pattern?: string) {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  const keys = Array.from(cache.keys());
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  });
}

const extractFrameworks = (repositories: Repository[]): string[] => {
  const frameworkKeywords = [
    'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'gatsby',
    'express', 'fastify', 'koa', 'django', 'flask', 'rails',
    'laravel', 'spring', 'dotnet', 'gin', 'fiber', 'actix', 'rocket',
  ];

  const frameworks = new Set<string>();

  repositories.forEach(repo => {
    repo.topics?.forEach(topic => {
      if (frameworkKeywords.includes(topic.toLowerCase())) {
        frameworks.add(topic);
      }
    });

    const repoName = repo.name.toLowerCase();
    frameworkKeywords.forEach(framework => {
      if (repoName.includes(framework)) {
        frameworks.add(framework);
      }
    });
  });

  return Array.from(frameworks);
};

const calculateLanguageStats = (repositories: Repository[]): LanguageStats => {
  return repositories.reduce((stats: LanguageStats, repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + repo.size;
    }
    return stats;
  }, {});
};

const createOctokitClient = (token?: string) =>
  new Octokit({
    auth: token || process.env.GITHUB_TOKEN,
  });

const createGraphQLClient = (token?: string) =>
  graphql.defaults({
    headers: {
      authorization: `token ${token || process.env.GITHUB_TOKEN}`,
    },
  });

const getUser =
  (octokit: Octokit) =>
  async (username: string): Promise<GitHubUser> => {
    const key = `github_user_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    try {
      const { data } = await octokit.rest.users.getByUsername({ username });
      setCached(key, data);
      return data as GitHubUser;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${username}`);
    }
  };

const getUserRepositories =
  (octokit: Octokit) =>
  async (username: string, per_page = 100): Promise<Repository[]> => {
    const key = `github_repos_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    try {
      const { data } = await octokit.rest.repos.listForUser({
        username,
        per_page,
        sort: 'updated',
        type: 'owner',
      });
      setCached(key, data);
      return data as Repository[];
    } catch (error) {
      throw new Error(`Failed to fetch repositories for: ${username}`);
    }
  };

const getLanguageStats =
  (octokit: Octokit) =>
  async (username: string): Promise<LanguageStats> => {
    const key = `github_language_stats_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    const getUserReposFn = getUserRepositories(octokit);
    const repositories = await getUserReposFn(username);
    const stats = calculateLanguageStats(repositories);
    setCached(key, stats);
    return stats;
  };

// ✅ FIX: Contribution Calendar با خطا handling بهتر
const getContributionCalendar =
  (graphqlClient: typeof graphql) =>
  async (username: string): Promise<CommitActivity[]> => {
    const key = `github_contribution_calendar_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const fromDate = oneYearAgo.toISOString();
      const toDate = new Date().toISOString();

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const result: any = await graphqlClient(query, {
        username,
        from: fromDate,
        to: toDate,
      });

      const weeks = result.user.contributionsCollection.contributionCalendar.weeks;
      const contributions: CommitActivity[] = [];

      weeks.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          contributions.push({
            date: day.date,
            count: day.contributionCount,
          });
        });
      });

      setCached(key, contributions);
      return contributions;
    } catch (error) {
      console.error('Error fetching contribution calendar:', error);
      return [];
    }
  };

// ✅ FIX: بهبود محاسبه Total Commits
const getTotalCommits =
  (graphqlClient: typeof graphql) =>
  async (username: string): Promise<number> => {
    const key = `github_total_commits_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
            }
          }
        }
      `;

      const result: any = await graphqlClient(query, { username });
      const totalCommits = result.user.contributionsCollection.totalCommitContributions;

      setCached(key, totalCommits);
      return totalCommits;
    } catch (error) {
      console.error('Error fetching total commits:', error);
      return 0;
    }
  };

// ✅ FIX: اصلاح calculateStreaks
const calculateStreaks = (
  contributions: CommitActivity[]
): { current: number; longest: number } => {
  if (contributions.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort by date ascending
  const sortedContribs = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate longest streak
  for (const contrib of sortedContribs) {
    if (contrib.count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak (from today backwards)
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from the most recent date
  for (let i = sortedContribs.length - 1; i >= 0; i--) {
    const contribDate = new Date(sortedContribs[i].date);
    contribDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (today.getTime() - contribDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Allow 1 day grace period (today or yesterday)
    if (daysDiff > currentStreak + 1) {
      break;
    }

    if (sortedContribs[i].count > 0) {
      currentStreak++;
    }
  }

  return {
    current: currentStreak,
    longest: longestStreak,
  };
};

// ✅ FIX: تحلیل مهارت‌ها با داده‌های دقیق‌تر
const analyzeUserSkills =
  (octokit: Octokit, graphqlClient: typeof graphql) =>
  async (username: string): Promise<SkillAnalysis> => {
    const key = `github_analytics_${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached) return cached;

    const getUserFn = getUser(octokit);
    const getUserReposFn = getUserRepositories(octokit);
    const getLanguageStatsFn = getLanguageStats(octokit);
    const getTotalCommitsFn = getTotalCommits(graphqlClient);
    const getContributionCalendarFn = getContributionCalendar(graphqlClient);

    const [user, repositories, languageStats, totalCommits, contributions] =
      await Promise.all([
        getUserFn(username),
        getUserReposFn(username),
        getLanguageStatsFn(username),
        getTotalCommitsFn(username),
        getContributionCalendarFn(username),
      ]);

    const frameworks = extractFrameworks(repositories);
    const streaks = calculateStreaks(contributions);

    // محاسبه average commits per day
    const activeDays = contributions.filter(c => c.count > 0).length;
    const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);
    const avgCommitsPerDay = activeDays > 0 ? totalContributions / activeDays : 0;

    // Find most active day
    const dayActivity: { [key: string]: number } = {};
    contributions.forEach(contrib => {
      const dayName = new Date(contrib.date).toLocaleDateString('en-US', {
        weekday: 'long',
      });
      dayActivity[dayName] = (dayActivity[dayName] || 0) + contrib.count;
    });

    const mostActiveDay =
      Object.keys(dayActivity).length > 0
        ? Object.keys(dayActivity).reduce((a, b) =>
            dayActivity[a] > dayActivity[b] ? a : b
          )
        : 'Monday';

    const analytics = {
      languages: languageStats,
      frameworks,
      totalCommits: Math.max(totalCommits, totalContributions),
      avgCommitsPerDay: parseFloat(avgCommitsPerDay.toFixed(1)),
      mostActiveDay,
      longestStreak: streaks.longest,
    };

    setCached(key, analytics);
    return analytics;
  };

// Factory function
export const createGitHubService = (token?: string) => {
  const octokit = createOctokitClient(token);
  const graphqlClient = createGraphQLClient(token);

  return {
    getUser: getUser(octokit),
    getUserRepositories: getUserRepositories(octokit),
    getLanguageStats: getLanguageStats(octokit),
    analyzeUserSkills: analyzeUserSkills(octokit, graphqlClient),
    getContributionCalendar: getContributionCalendar(graphqlClient),
    clearCache,
  };
};

// Backward compatibility
export class GitHubService {
  private service: ReturnType<typeof createGitHubService>;

  constructor(token?: string) {
    this.service = createGitHubService(token);
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.service.getUser(username);
  }

  async getUserRepositories(username: string, per_page = 100): Promise<Repository[]> {
    return this.service.getUserRepositories(username, per_page);
  }

  async getLanguageStats(username: string): Promise<LanguageStats> {
    return this.service.getLanguageStats(username);
  }

  async analyzeUserSkills(username: string): Promise<SkillAnalysis> {
    return this.service.analyzeUserSkills(username);
  }

  async getContributionCalendar(username: string): Promise<CommitActivity[]> {
    return this.service.getContributionCalendar(username);
  }

  clearCache(pattern?: string) {
    clearCache(pattern);
  }
}

// ====== src/components/battle/BattleArena.tsx ======
// ✅ حذف localStorage

export function BattleArenaFix() {
  // در handleBattleFromParams:
  // ❌ حذف این خط:
  // const cachedResult = loadCachedBattle(cacheKey);
  
  // ✅ به جای آن از in-memory cache استفاده کنید
  // Cache به صورت خودکار توسط github.service مدیریت می‌شود
  
  // در startBattle:
  // ❌ حذف این خط:
  // localStorage.setItem(`battle_cache_${cacheKey}`, JSON.stringify(result));
  
  // ✅ فقط saveBattle را نگه دارید (اگر نیاز به persistent storage دارید)
  // saveBattle(result);
}