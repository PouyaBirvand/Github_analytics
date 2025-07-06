'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { footerData } from '@/lib/constants/footer';

export const FeaturesSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="space-y-4 sm:space-y-6"
    >
      <h3 className="font-bold text-base sm:text-lg text-foreground">
        Features
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {footerData.features.map((feature, index) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
