// src/components/battle/BattleSetup.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BattlePreview } from './BattlePreview';
// import { BattleHistory } from './BattleHistory';
import { useSearchParams } from 'next/navigation';

interface BattleSetupProps {
  onBattleStart: (username1: string, username2: string) => void;
  error: string | null;
}

export const BattleSetup: React.FC<BattleSetupProps> = ({
  onBattleStart,
  error,
}) => {
  const searchParams = useSearchParams();
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user1 = searchParams.get('user1');
    const user2 = searchParams.get('user2');
    if (user1) setUsername1(user1);
    if (user2) setUsername2(user2);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username1.trim() || !username2.trim()) return;

    setIsLoading(true);
    await onBattleStart(username1.trim(), username2.trim());
    setIsLoading(false);
  };

  const handleRandomBattle = () => {
    const famousDevelopers = [
      'torvalds',
      'gaearon',
      'sindresorhus',
      'tj',
      'addyosmani',
      'kentcdodds',
      'wesbos',
      'bradtraversy',
      'getify',
      'rwaldron',
    ];

    const randomDevs = famousDevelopers
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setUsername1(randomDevs[0]);
    setUsername2(randomDevs[1]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8 sm:space-y-12"
    >
      <div className="bg-background/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-border/50 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6 sm:mb-8 space-y-3 sm:space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your Fighters
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Enter two GitHub usernames to start the epic battle
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Fighter 1
              </label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username1}
                  onChange={e => setUsername1(e.target.value)}
                  className="pl-10 sm:pl-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Fighter 2
              </label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username2}
                  onChange={e => setUsername2(e.target.value)}
                  className="pl-10 sm:pl-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12"
                />
              </div>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 border border-destructive/20 rounded-lg p-4"
            >
              <p className="text-destructive text-sm">{error}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button
              type="submit"
              disabled={!username1.trim() || !username2.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Starting Battle...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
                  Start Epic Battle!
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleRandomBattle}
              variant="outline"
              className="border-border/50 hover:bg-muted/50 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 group"
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-spin" />
              Random Battle
            </Button>
          </motion.div>
        </form>
      </div>

      <BattlePreview />
      {/* <BattleHistory /> */}
    </motion.div>
  );
};