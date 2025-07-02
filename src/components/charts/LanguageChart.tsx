'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageStats } from '@/types/github';
import { getLanguageColor } from '@/lib/utils';
import { Code2, TrendingUp, Sparkles } from 'lucide-react';

interface LanguageChartProps {
  languages: LanguageStats;
}

export const LanguageChart: React.FC<LanguageChartProps> = ({ languages }) => {
  const data = Object.entries(languages)
    .map(([name, value]) => ({
      name,
      value,
      color: getLanguageColor(name),
      percentage: 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: (item.value / total) * 100,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium">{data.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {data.percentage.toFixed(1)}% usage
          </p>
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
                className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Code2 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Programming Languages
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Distribution of languages across your repositories
            </p>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="h-80 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataWithPercentage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {dataWithPercentage.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center decoration */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {dataWithPercentage.length} Languages
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Languages List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Language Breakdown</h3>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {dataWithPercentage.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: lang.color }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {lang.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-primary">
                          {lang.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <motion.div
                      className="mt-2 h-1 bg-muted/50 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          duration: 1,
                          ease: 'easeOut',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-6 p-4 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-xl border border-border/50"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Most Used:</span>
                    <p className="font-medium text-primary">
                      {dataWithPercentage[0]?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Total Languages:
                    </span>
                    <p className="font-medium text-primary">
                      {dataWithPercentage.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
