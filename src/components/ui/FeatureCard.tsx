'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  gradient: string;
}

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
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="h-full group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
               style={{ background: gradient }} />
          
          <motion.div
            className={`w-20 h-20 mx-auto rounded-2xl ${bgColor} flex items-center justify-center relative`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
            <Icon className={`w-10 h-10 ${color} relative z-10`} />
          </motion.div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <motion.div
            className="w-full h-1 bg-gradient-to-r rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: gradient }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
