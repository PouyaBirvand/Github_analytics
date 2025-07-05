import React from 'react';
import { Metadata } from 'next';
import { BattleArena } from '@/components/battle/BattleArena';

export const metadata: Metadata = {
  title: 'Developer Battle Arena - GitHub Analytics',
  description:
    'Compare two developers head-to-head in an epic coding battle! See who wins across different categories like code warrior, community champion, and more.',
  keywords: [
    'developer battle',
    'github comparison',
    'developer vs developer',
    'coding battle',
    'github analytics battle',
    'developer competition',
  ],
  openGraph: {
    title: 'Developer Battle Arena - Compare GitHub Developers',
    description:
      'Epic developer battles! Compare coding skills, community impact, and technical expertise.',
    type: 'website',
  },
};

export default function BattlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-pink-950/40">
      <BattleArena />
    </div>
  );
}
