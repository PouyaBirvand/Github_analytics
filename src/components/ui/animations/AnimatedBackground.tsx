'use client';
import React from 'react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

interface AnimatedBackgroundProps {
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  overlay?: string;
  particleCount?: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  gradientFrom = 'from-blue-600',
  gradientVia = 'via-purple-600',
  gradientTo = 'to-pink-600',
  overlay = 'bg-black/20',
}) => {
  return (
    <>
      <ParticleBackground />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}`} />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
};