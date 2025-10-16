// src/components/battle/BattleArena.tsx
// ✅ نسخه کاملاً اصلاح شده بدون localStorage

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BattleSetup } from './BattleSetup';
import { BattleProgress } from './BattleProgress';
import { BattleResultDisplay } from './BattleResultDisplay';
import { BattleResult } from '@/types/battle.types';
import { createBattleService } from '@/services/battle.service';
import { GradientText } from '@/components/ui/GradientText';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { saveBattle, loadCachedBattle } from '@/utils/battle-storage';

type BattleState = 'setup' | 'battling' | 'result';

export const BattleArena: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [battleState, setBattleState] = useState<BattleState>('setup');
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user1 = searchParams.get('user1');
    const user2 = searchParams.get('user2');
    if (user1 && user2) {
      handleBattleFromParams(user1, user2);
    }
  }, [searchParams]);

  const handleBattleFromParams = async (user1: string, user2: string) => {
    // ✅ چک کردن cache از in-memory storage
    const cacheKey = `${user1.toLowerCase()}-vs-${user2.toLowerCase()}`;
    const cachedResult = loadCachedBattle(cacheKey);
    
    if (cachedResult) {
      console.log('Loading from cache:', cacheKey);
      setBattleResult(cachedResult);
      setBattleState('result');
      return;
    }

    // اگر cache نبود، battle جدید شروع کن
    setBattleState('battling');
    await startBattle(user1, user2);
  };

  const startBattle = async (username1: string, username2: string) => {
    setError(null);
    try {
      const battleService = createBattleService();
      const result = await battleService.createBattle(username1, username2);
      
      // ✅ فقط در in-memory storage ذخیره می‌شود
      saveBattle(result);
      
      setBattleResult(result);
      router.replace(`/battle?user1=${username1}&user2=${username2}`, { scroll: false });
      setBattleState('result');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Battle failed';
      setError(errorMessage);
      setBattleState('setup');
      console.error('Battle error:', err);
    }
  };

  const handleBattleStart = async (username1: string, username2: string) => {
    setBattleState('battling');
    await startBattle(username1, username2);
  };

  const handleNewBattle = () => {
    router.replace('/battle', { scroll: false });
    setBattleState('setup');
    setBattleResult(null);
    setError(null);
  };

  return (
    <section className="relative py-48 md:py-60 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ParticleBackground />
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6"
        >
          <GradientText
            text="Developer Battle Arena"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            gradient="from-purple-600 via-blue-600 to-pink-600"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
          >
            Epic coding battles between GitHub developers! Compare skills,
            contributions, and community impact in real-time.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {battleState === 'setup' && (
            <BattleSetup onBattleStart={handleBattleStart} error={error} />
          )}
          {battleState === 'battling' && <BattleProgress />}
          {battleState === 'result' && battleResult && (
            <BattleResultDisplay
              battleResult={battleResult}
              onNewBattle={handleNewBattle}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};