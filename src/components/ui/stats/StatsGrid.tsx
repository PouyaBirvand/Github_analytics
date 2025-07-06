'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      viewport={{ once: true }}
      className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8 ${className}`}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          color={stat.color}
          delay={1.2 + index * 0.2}
        />
      ))}
    </motion.div>
  );
};
