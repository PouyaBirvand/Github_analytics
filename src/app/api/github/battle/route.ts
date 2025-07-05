import { NextRequest, NextResponse } from 'next/server';
import { BattleService } from '@/services/battle.service';
import { BattleValidator } from '@/utils/battle-validator';

export async function POST(request: NextRequest) {
  try {
    const { username1, username2 } = await request.json();

    // Validate input
    const validation = BattleValidator.validateBattleInput(
      username1,
      username2
    );
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Create battle
    const battleService = new BattleService();
    const battleResult = await battleService.createBattle(username1, username2);

    return NextResponse.json(battleResult);
  } catch (error) {
    console.error('Battle API error:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const battleId = searchParams.get('battleId');

  if (!battleId) {
    return NextResponse.json(
      { error: 'Battle ID is required' },
      { status: 400 }
    );
  }

  try {
    // Extract usernames from battleId and recreate battle
    const parts = battleId.split('-vs-');
    if (parts.length < 2) {
      return NextResponse.json(
        { error: 'Invalid battle ID format' },
        { status: 400 }
      );
    }

    const username1 = parts[0];
    const username2Parts = parts[1].split('-');
    const username2 = username2Parts[0];

    const battleService = new BattleService();
    const battleResult = await battleService.createBattle(username1, username2);

    return NextResponse.json(battleResult);
  } catch (error) {
    console.error('Battle retrieval error:', error);

    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }
}
