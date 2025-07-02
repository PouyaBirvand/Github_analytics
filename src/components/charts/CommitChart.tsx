'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommitActivity } from '@/types/github';
import { GitCommit, TrendingUp, Calendar, Activity } from 'lucide-react';

interface CommitChartProps {
  data: CommitActivity[];
  title?: string;
}

export const CommitChart: React.FC<CommitChartProps> = ({
  data,
  title = 'Commit Activity',
}) => {
  const processedData = data.slice(-30).map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    fullDate: new Date(item.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  const totalCommits = processedData.reduce((sum, item) => sum + item.count, 0);
  const avgCommits = (totalCommits / processedData.length).toFixed(1);
  const maxCommits = Math.max(...processedData.map(item => item.count));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
          <p className="font-medium mb-1">{data.fullDate}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            <span className="text-sm">
              {data.count} commit{data.count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

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
                className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <GitCommit className="w-6 h-6 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Your coding activity over the last 30 days
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 rounded-lg">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-medium">{totalCommits} Total</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{avgCommits} Avg/Day</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{maxCommits} Peak</span>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={processedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="commitGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  className="opacity-20"
                  stroke="hsl(var(--muted-foreground))"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  fill="url(#commitGradient)"
                  dot={{ fill: 'url(#lineGradient)', strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: 'url(#lineGradient)',
                    strokeWidth: 2,
                    fill: 'hsl(var(--background))',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
