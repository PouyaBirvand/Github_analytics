'use client';

import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '@/lib/constants/navigationData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-16 sm:top-20 right-2 sm:right-4 z-50 w-64 sm:w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl shadow-2xl lg:hidden"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={onClose}
                  >
                    {item.icon && (
                      <item.icon className="w-5 h-5 text-primary" />
                    )}
                    <span className="font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-3 sm:pt-4 border-t border-border/50"
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm sm:text-base">GitHub</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
