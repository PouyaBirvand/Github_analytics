'use client';

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigationItems } from '@/lib/constants/navigationData';

export const DesktopNavigation: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navigationItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <Link
            href={item.href}
            className="relative group flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300"
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            {item.label}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      ))}
      <motion.a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        GitHub
      </motion.a>
    </nav>
  );
};
