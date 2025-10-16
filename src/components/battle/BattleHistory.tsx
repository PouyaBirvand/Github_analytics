// src/components/battle/BattleHistory.tsx
// ✅ استفاده از in-memory storage

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Search } from 'lucide-react';
import { BattleResult } from '@/types/battle.types';
import {
  loadBattleHistory,
  deleteBattle,
  clearBattleHistory,
  getBattleStats,
  searchBattleHistory,
} from '@/utils/battle-storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatNumber } from '@/utils/numberFormat';

export const BattleHistory: React.FC = () => {
  const [battles, setBattles] = useState<BattleResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalBattles: 0, recentBattles: 0 });

  useEffect(() => {
    loadHistory();
    updateStats();
  }, []);

  const loadHistory = () => {
    const history = loadBattleHistory();
    setBattles(history);
  };

  const updateStats = () => {
    const battleStats = getBattleStats();
    setStats(battleStats);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      loadHistory();
    } else {
      const results = searchBattleHistory(term);
      setBattles(results);
    }
  };

  const handleDeleteBattle = (battleId: string) => {
    deleteBattle(battleId);
    loadHistory();
    updateStats();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all battle history?')) {
      clearBattleHistory();
      loadHistory();
      updateStats();
    }
  };

  const handleBattleClick = (battle: BattleResult) => {
    const url = `/battle?user1=${battle.participant1.user.login}&user2=${battle.participant2.user.login}`;
    window.location.href = url;
  };

  if (battles.length === 0 && searchTerm === '') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50"
      >
        <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-bold text-foreground mb-2">No Battle History</h3>
        <p className="text-muted-foreground">
          Start your first battle to see it here!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <History className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Battle History</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {stats.totalBattles} Total
            </Badge>
            <Badge variant="secondary">
              {stats.recentBattles} This Week
            </Badge>
            {battles.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search battles by username..."
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            className="pl-12 bg-background/50 border-border/50"
          />
        </div>

        <div className="space-y-4">
          {battles.map((battle, index) => (
            <motion.div
              key={battle.battleId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleBattleClick(battle)}
              className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="w-10 h-10 ring-2 ring-blue-500/30">
                    <AvatarImage src={battle.participant1.user.avatar_url} />
                    <AvatarFallback>
                      {battle.participant1.user.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">
                      {battle.participant1.user.login}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {formatNumber(battle.participant1.battleStats.totalScore)}
                    </Badge>
                  </div>

                  <span className="text-muted-foreground font-bold">VS</span>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">
                      {battle.participant2.user.login}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {formatNumber(battle.participant2.battleStats.totalScore)}
                    </Badge>
                  </div>

                  <Avatar className="w-10 h-10 ring-2 ring-purple-500/30">
                    <AvatarImage src={battle.participant2.user.avatar_url} />
                    <AvatarFallback>
                      {battle.participant2.user.login[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge
                    variant={battle.winner === 'tie' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {battle.winner === 'tie'
                      ? 'Tie'
                      : battle.winner === 'participant1'
                      ? `${battle.participant1.user.login} wins`
                      : `${battle.participant2.user.login} wins`}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteBattle(battle.battleId);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                {new Date(battle.createdAt).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>

        {battles.length === 0 && searchTerm !== '' && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No battles found for "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};