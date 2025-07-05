'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Zap, Trophy, Users, Target, Flame } from 'lucide-react';

const battleSteps = [
  {
    icon: Users,
    label: 'Fetching Fighters',
    description: 'Loading developer profiles...',
  },
  {
    icon: Target,
    label: 'Analyzing Skills',
    description: 'Evaluating coding abilities...',
  },
  {
    icon: Sword,
    label: 'Battle in Progress',
    description: 'Comparing achievements...',
  },
  {
    icon: Trophy,
    label: 'Determining Winner',
    description: 'Calculating final scores...',
  },
];

export const BattleProgress: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-background/60 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 border border-border/50 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 space-y-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex p-4 sm:p-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
          >
            <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Epic Battle in Progress!
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Our algorithms are analyzing the fighters and determining the
            ultimate winner...
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {battleSteps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.3,
                  ease: 'easeOut',
                }}
                className="flex items-center space-x-4 sm:space-x-6"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="flex-shrink-0 p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                    {step.label}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                  className="flex-shrink-0"
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 sm:mt-12"
        >
          <div className="bg-muted/30 rounded-full h-2 sm:h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            />
          </div>

          <div className="flex justify-center mt-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <Zap className="w-4 h-4" />
              <span>Analyzing developer data...</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
