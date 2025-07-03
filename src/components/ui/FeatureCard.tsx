'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FeatureCardProps } from '@/types/feature-card.types';

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  gradient,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="h-full group hover:shadow-xl sm:hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            style={{ background: gradient }}
          />

          <motion.div
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-xl sm:rounded-2xl ${bgColor} flex items-center justify-center relative`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
            />
            <Icon
              className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color} relative z-10`}
            />
          </motion.div>

          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <motion.div
            className="w-full h-0.5 sm:h-1 bg-gradient-to-r rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: gradient }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
