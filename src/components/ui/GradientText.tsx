'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  animate = true,
}) => {
  if (animate) {
    return (
      <motion.h1
        className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        {text}
      </motion.h1>
    );
  }

  return (
    <h1
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
    >
      {text}
    </h1>
  );
};
