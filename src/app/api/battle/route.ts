// app/api/battle/route.ts
import { NextResponse } from 'next/server';
import { createBattle } from '@/services/battle.service';

export async function POST(request: Request) {
  try {
    const { username1, username2 } = await request.json();

    // Validate input
    if (!username1 || !username2) {
      return NextResponse.json({ error: 'Both usernames are required' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      throw new Error('GitHub token is not configured');
    }

    const battleResult = await createBattle(username1, username2, githubToken);
    return NextResponse.json(battleResult, { status: 200 });
  } catch (error) {
    console.error('Battle API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process battle';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Explicitly reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405, headers: { Allow: 'POST' } });
}