import { NextRequest, NextResponse } from 'next/server';
import { GitHubService } from '@/services/github.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const { searchParams } = new URL(request.url);
    const per_page = parseInt(searchParams.get('per_page') || '100');
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const githubService = new GitHubService();
    const repositories = await githubService.getUserRepositories(username, per_page);

    return NextResponse.json(repositories, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
