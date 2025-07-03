'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { GradientTextProps } from '@/types/gradient-text.types';

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  animate = true,
}) => {
  // Split text for better mobile wrapping
  const words = text.split(' ');
  const shouldWrap = words.length > 2;

  if (animate) {
    return (
      <motion.h1
        className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className} ${
          shouldWrap ? 'break-words hyphens-auto' : ''
        }`}
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
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {shouldWrap ? (
          <>
            <span className="block sm:inline">
              {words.slice(0, -1).join(' ')}
            </span>{' '}
            <span className="block sm:inline">{words[words.length - 1]}</span>
          </>
        ) : (
          text
        )}
      </motion.h1>
    );
  }

  return (
    <h1
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className} ${
        shouldWrap ? 'break-words hyphens-auto' : ''
      }`}
      style={{
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {shouldWrap ? (
        <>
          <span className="block sm:inline">
            {words.slice(0, -1).join(' ')}
          </span>{' '}
          <span className="block sm:inline">{words[words.length - 1]}</span>
        </>
      ) : (
        text
      )}
    </h1>
  );
};
