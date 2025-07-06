'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  color: string;
  rotationDuration?: number;
  floatDuration?: number;
  floatRange?: [number, number, number];
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  Icon,
  color,
  rotationDuration = 20,
  floatDuration = 3,
  floatRange = [-10, 10, -10],
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        rotate: 360,
        y: floatRange,
      }}
      transition={{
        rotate: {
          duration: rotationDuration,
          repeat: Infinity,
          ease: 'linear',
        },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      className={`p-4 bg-white/10 rounded-full backdrop-blur-sm ${className}`}
    >
      <Icon className={`w-8 h-8 ${color}`} />
    </motion.div>
  );
};
