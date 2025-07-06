'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export const FooterBottom: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
      className="pt-6 sm:pt-8 border-t border-border/50"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Made with love section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            </motion.div>
            <span className="hidden sm:inline">
              using Next.js & Tailwind CSS
            </span>
            <span className="sm:hidden">by developers</span>
          </div>
        </div>

        {/* Links and scroll to top */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="hidden sm:inline">© 2025 GitHub Analytics</span>
          </div>

          {/* Copyright for mobile */}
          <div className="sm:hidden text-xs text-muted-foreground">
            © 2025 GitHub Analytics
          </div>

          <motion.button
            onClick={scrollToTop}
            className="p-1.5 sm:p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="sr-only">Scroll to top</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
