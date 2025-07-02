export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
    bio?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description?: string;
    language?: string;
    stargazers_count: number;
    forks_count: number;
    size: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    topics: string[];
  }
  
  export interface Commit {
    sha: string;
    commit: {
      author: {
        name: string;
        email: string;
        date: string;
      };
      message: string;
    };
  }
  
  export interface LanguageStats {
    [key: string]: number;
  }
  
  export interface CommitActivity {
    date: string;
    count: number;
  }
  
  export interface SkillAnalysis {
    languages: LanguageStats;
    frameworks: string[];
    totalCommits: number;
    avgCommitsPerDay: number;
    mostActiveDay: string;
    longestStreak: number;
  }
  