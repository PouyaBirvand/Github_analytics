import { BattleResult } from '@/types/battle.types';

const battleHistoryMap = new Map<string, BattleResult>();
const MAX_HISTORY_SIZE = 50;

export function saveBattle(battleResult: BattleResult): void {
  try {
    const battleId = `${battleResult.participant1.user.login}-vs-${battleResult.participant2.user.login}`.toLowerCase();
    
    if (battleHistoryMap.size >= MAX_HISTORY_SIZE) {
      const firstKey = battleHistoryMap.keys().next().value;
      if (firstKey) {
        battleHistoryMap.delete(firstKey);
      }
    }
    
    battleHistoryMap.set(battleId, battleResult);
  } catch (error) {
    console.error('Error saving battle:', error);
  }
}

export function loadCachedBattle(battleId: string): BattleResult | null {
  try {
    const key = battleId.toLowerCase();
    return battleHistoryMap.get(key) || null;
  } catch (error) {
    console.error('Error loading cached battle:', error);
    return null;
  }
}

export function loadBattleHistory(): BattleResult[] {
  try {
    return Array.from(battleHistoryMap.values())
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice(0, 20);
  } catch (error) {
    console.error('Error loading battle history:', error);
    return [];
  }
}

export function deleteBattle(battleId: string): void {
  try {
    const key = battleId.toLowerCase();
    battleHistoryMap.delete(key);
  } catch (error) {
    console.error('Error deleting battle:', error);
  }
}

export function clearBattleHistory(): void {
  try {
    battleHistoryMap.clear();
  } catch (error) {
    console.error('Error clearing battle history:', error);
  }
}

export function getBattleStats(): {
  totalBattles: number;
  recentBattles: number;
} {
  const total = battleHistoryMap.size;
  const recent = Array.from(battleHistoryMap.values()).filter(battle => {
    const daysDiff = Math.floor(
      (Date.now() - new Date(battle.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff <= 7;
  }).length;

  return {
    totalBattles: total,
    recentBattles: recent,
  };
}

export function searchBattleHistory(username: string): BattleResult[] {
  try {
    const searchTerm = username.toLowerCase();
    return Array.from(battleHistoryMap.values()).filter(battle => {
      const user1 = battle.participant1.user.login.toLowerCase();
      const user2 = battle.participant2.user.login.toLowerCase();
      return user1.includes(searchTerm) || user2.includes(searchTerm);
    });
  } catch (error) {
    console.error('Error searching battle history:', error);
    return [];
  }
}

export function getUserBattles(username: string): BattleResult[] {
  try {
    const searchTerm = username.toLowerCase();
    return Array.from(battleHistoryMap.values())
      .filter(battle => {
        const user1 = battle.participant1.user.login.toLowerCase();
        const user2 = battle.participant2.user.login.toLowerCase();
        return user1 === searchTerm || user2 === searchTerm;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  } catch (error) {
    console.error('Error getting user battles:', error);
    return [];
  }
}

export default {
  saveBattle,
  loadCachedBattle,
  loadBattleHistory,
  deleteBattle,
  clearBattleHistory,
  getBattleStats,
  searchBattleHistory,
  getUserBattles,
};