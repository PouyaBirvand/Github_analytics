'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <motion.button
      className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
