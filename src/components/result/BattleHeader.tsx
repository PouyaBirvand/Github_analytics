'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BattleResult } from '@/types/battle.types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';

interface BattleHeaderProps {
  battleResult: BattleResult;
}

export const BattleHeader: React.FC<BattleHeaderProps> = ({ battleResult }) => {
  const { participant1, participant2 } = battleResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-6 sm:space-y-8"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="space-y-4 p-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          Epic Battle Results
        </h1>
      </motion.div>

      <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-border/50 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-16">
          {/* Participant 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center space-y-4 flex-1 max-w-sm"
          >
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-30" />
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto relative z-10 ring-4 ring-blue-500/50 shadow-2xl">
                  <AvatarImage
                    src={participant1.user.avatar_url}
                    alt={participant1.user.login}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    {participant1.user.login[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                {participant1.user.name || participant1.user.login}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                @{participant1.user.login}
              </p>

              {participant1.user.bio && (
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto line-clamp-2">
                  {participant1.user.bio}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {participant1.user.location && (
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {participant1.user.location}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {participant1.user.followers} followers
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* VS */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
              >
                VS
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 blur-xl opacity-20 rounded-full" />
            </div>
          </motion.div>

          {/* Participant 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center space-y-4 flex-1 max-w-sm"
          >
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30" />
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto relative z-10 ring-4 ring-purple-500/50 shadow-2xl">
                  <AvatarImage
                    src={participant2.user.avatar_url}
                    alt={participant2.user.login}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {participant2.user.login[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                {participant2.user.name || participant2.user.login}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                @{participant2.user.login}
              </p>

              {participant2.user.bio && (
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto line-clamp-2">
                  {participant2.user.bio}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {participant2.user.location && (
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {participant2.user.location}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {participant2.user.followers} followers
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
