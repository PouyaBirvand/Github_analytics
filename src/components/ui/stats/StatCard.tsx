'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  color,
  delay = 0,
}) => {
  return (
    <div className="text-center space-y-2">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={`text-3xl md:text-4xl font-bold ${color}`}
      >
        {value}
      </motion.div>
      <p className="text-white/80">{label}</p>
    </div>
  );
};