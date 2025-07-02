'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SkillAnalysis } from '@/types/github';
import { formatNumber } from '@/lib/utils';
import { Code, GitCommit, Calendar, Zap, TrendingUp } from 'lucide-react';

interface SkillsOverviewProps {
  skills: SkillAnalysis;
}

export const SkillsOverview: React.FC<SkillsOverviewProps> = ({ skills }) => {
  const stats = [
    {
      icon: GitCommit,
      label: 'Total Commits',
      value: formatNumber(skills.totalCommits),
      gradient: 'from-green-500 to-emerald-500',
      description: 'Code contributions',
      trend: '+12%',
      progress: 85,
    },
    {
      icon: Calendar,
      label: 'Daily Average',
      value: skills.avgCommitsPerDay.toFixed(1),
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Commits per day',
      trend: '+5%',
      progress: 70,
    },
    {
      icon: Code,
      label: 'Languages',
      value: Object.keys(skills.languages).length.toString(),
      gradient: 'from-purple-500 to-pink-500',
      description: 'Programming languages',
      trend: '+2',
      progress: 60,
    },
    {
      icon: Zap,
      label: 'Frameworks',
      value: skills.frameworks.length.toString(),
      gradient: 'from-orange-500 to-red-500',
      description: 'Technologies used',
      trend: '+3',
      progress: 75,
    },
  ];

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Skills Overview</h2>
        <p className="text-muted-foreground">Your coding journey at a glance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
          >
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 hover:shadow-2xl transition-all duration-500">
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')[3]})`,
                }}
              />

              <CardContent className="relative p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <motion.div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <motion.div
                    className="text-3xl font-bold text-primary group-hover:scale-105 transition-transform origin-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {stat.value}
                  </motion.div>

                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {stat.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <motion.div
                  className="w-full h-1 bg-muted rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{
                      delay: index * 0.1 + 0.6,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
