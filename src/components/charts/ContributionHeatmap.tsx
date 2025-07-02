'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommitActivity } from '@/types/github';
import { cn } from '@/lib/utils';
import { Flame, Calendar, Target, TrendingUp } from 'lucide-react';

interface ContributionHeatmapProps {
  data: CommitActivity[];
}

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({ data }) => {
  const getIntensity = (count: number): string => {
    if (count === 0) return 'bg-muted/30 hover:bg-muted/50';
    if (count <= 2) return 'bg-green-200/60 hover:bg-green-200 dark:bg-green-900/60 dark:hover:bg-green-900';
    if (count <= 4) return 'bg-green-300/70 hover:bg-green-300 dark:bg-green-700/70 dark:hover:bg-green-700';
    if (count <= 6) return 'bg-green-400/80 hover:bg-green-400 dark:bg-green-600/80 dark:hover:bg-green-600';
    return 'bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-400';
  };

  // const getIntensityLevel = (count: number): number => {
  //   if (count === 0) return 0;
  //   if (count <= 2) return 1;
  //   if (count <= 4) return 2;
  //   if (count <= 6) return 3;
  //   return 4;
  // };

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const totalContributions = data.reduce((sum, day) => sum + day.count, 0);
  const activedays = data.filter(day => day.count > 0).length;
  const maxStreak = calculateMaxStreak(data);
  const currentStreak = calculateCurrentStreak(data);

  function calculateMaxStreak(data: CommitActivity[]): number {
    let maxStreak = 0;
    let currentStreak = 0;
    
    for (const day of data) {
      if (day.count > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    return maxStreak;
  }

  function calculateCurrentStreak(data: CommitActivity[]): number {
    let streak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <CardTitle className="flex items-center gap-3 text-2xl">
              <motion.div
                className="p-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Contribution Heatmap
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Your daily contribution activity over the year
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 rounded-lg">
              <Target className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-bold">{totalContributions}</div>
                <div className="text-xs opacity-70">Total</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg">
              <Calendar className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-bold">{activedays}</div>
                <div className="text-xs opacity-70">Active Days</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg">
              <Flame className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-bold">{maxStreak}</div>
                <div className="text-xs opacity-70">Max Streak</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 text-orange-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-bold">{currentStreak}</div>
                <div className="text-xs opacity-70">Current</div>
              </div>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Month labels */}
            <div className="flex justify-between text-xs text-muted-foreground px-8">
              {months.map(month => (
                <span key={month} className="font-medium">{month}</span>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1 justify-center">
              {/* Day labels */}
              <div className="flex flex-col gap-1 text-xs text-muted-foreground pr-3 justify-center">
                {days.map((day, index) => (
                  <div key={day} className="h-3 flex items-center">
                    {index % 2 === 1 && <span className="font-medium">{day}</span>}
                  </div>
                ))}
              </div>

              {/* Contribution squares */}
              <div className="flex gap-1 overflow-x-auto pb-2">
                {weeks.map((week, weekIndex) => (
                  <motion.div
                    key={weekIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + weekIndex * 0.01, duration: 0.3 }}
                    className="flex flex-col gap-1"
                  >
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className={cn(
                          'w-3 h-3 rounded-sm transition-all duration-200 cursor-pointer border border-border/20',
                          getIntensity(day.count)
                        )}
                        whileHover={{ 
                          scale: 1.3, 
                          zIndex: 10,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
                        }}
                        title={`${day.count} contributions on ${day.date}`}
                        style={{
                          boxShadow: day.count > 0 ? `0 0 ${day.count * 2}px rgba(34, 197, 94, 0.3)` : 'none'
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-between text-xs text-muted-foreground bg-muted/20 rounded-lg p-4"
            >
              <span className="font-medium">Less</span>
              <div className="flex gap-1 items-center">
                {[0, 1, 3, 5, 7].map(count => (
                  <motion.div
                    key={count}
                    className={cn('w-3 h-3 rounded-sm border border-border/20', getIntensity(count))}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
              <span className="font-medium">More</span>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
