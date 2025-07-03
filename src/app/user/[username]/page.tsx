import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GitHubService } from '@/services/github.service';
import { UserProfile } from '@/components/profile/UserProfile';
import { SkillsOverview } from '@/components/profile/SkillsOverview';
import { LanguageChart } from '@/components/charts/LanguageChart';
import { CommitChart } from '@/components/charts/CommitChart';
import { ContributionHeatmap } from '@/components/charts/ContributionHeatmap';
import { RepositoryList } from '@/components/profile/RepositoryList';
import { UserPageProps } from '@/types/user-page.types';

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { username } = await params;
  try {
    const githubService = new GitHubService();
    const user = await githubService.getUser(username);
    return {
      title: `${user.name || user.login} - GitHub Analytics`,
      description: `Analyze ${user.name || user.login}'s GitHub profile with detailed statistics, language breakdown, and contribution patterns.`,
      openGraph: {
        title: `${user.name || user.login} - GitHub Analytics`,
        description: user.bio || `GitHub profile analytics for ${user.login}`,
        images: [user.avatar_url],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${user.name || user.login} - GitHub Analytics`,
        description: user.bio || `GitHub profile analytics for ${user.login}`,
        images: [user.avatar_url],
      },
    };
  } catch (error) {
    return {
      title: 'User Not Found - GitHub Analytics',
      description: 'The requested GitHub user could not be found.',
    };
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  try {
    const githubService = new GitHubService();
    const [user, repositories, analytics] = await Promise.all([
      githubService.getUser(username),
      githubService.getUserRepositories(username),
      githubService.analyzeUserSkills(username),
    ]);

    const contributionCalendar =
      await githubService.getContributionCalendar(username);

    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-32 min-h-screen space-y-6 sm:space-y-8">
        <UserProfile user={user} />
        <SkillsOverview skills={analytics} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          <LanguageChart languages={analytics.languages} />
          <CommitChart
            data={contributionCalendar.slice(-30)}
            title="Recent Activity"
          />
        </div>
        <ContributionHeatmap data={contributionCalendar} />
        <RepositoryList repositories={repositories} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export const revalidate = 3600; // Revalidate every hour
