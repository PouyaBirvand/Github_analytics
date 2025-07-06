'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export const RepositoryHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <CardTitle className="flex items-center gap-3 text-2xl">
        <motion.div
          className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Code className="w-6 h-6 text-white" />
        </motion.div>
        <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Top Repositories
        </span>
      </CardTitle>
      <p className="text-muted-foreground mt-2">
        Showcase of your most popular projects
      </p>
    </motion.div>
  );
};
