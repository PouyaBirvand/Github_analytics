import { NextRequest, NextResponse } from 'next/server';
import { GitHubService } from '@/services/github.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const githubService = new GitHubService();

    const [skills, contributionCalendar] = await Promise.all([
      githubService.analyzeUserSkills(username),
      githubService.getContributionCalendar(username),
    ]);

    return NextResponse.json(
      {
        skills,
        contributionCalendar,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
