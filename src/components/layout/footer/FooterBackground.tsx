'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DOT_POSITIONS } from '@/lib/constants/dots';

export const FooterBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      {DOT_POSITIONS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary/20 rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
};
