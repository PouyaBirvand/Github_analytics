'use client';
import { useState, useCallback } from 'react';
import { BattleResult } from '@/types/battle.types';
import { createBattleService } from '@/services/battle.service';

interface UseBattleReturn {
  battleResult: BattleResult | null;
  isLoading: boolean;
  error: string | null;
  startBattle: (username1: string, username2: string) => Promise<void>;
  resetBattle: () => void;
}

export const useBattle = (): UseBattleReturn => {
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startBattle = useCallback(
    async (username1: string, username2: string) => {
      setIsLoading(true);
      setError(null);
      setBattleResult(null);
      
      try {
        const battleService = createBattleService();
        const result = await battleService.createBattle(username1, username2);
        setBattleResult(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Battle failed';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetBattle = useCallback(() => {
    setBattleResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    battleResult,
    isLoading,
    error,
    startBattle,
    resetBattle,
  };
};
