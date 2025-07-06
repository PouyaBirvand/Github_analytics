'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { footerData } from '@/lib/constants/footer';

export const QuickLinksSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="space-y-4 sm:space-y-6"
    >
      <h3 className="font-bold text-base sm:text-lg text-foreground">
        Quick Links
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {footerData.quickLinks.map((link, index) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
            >
              {link.icon && (
                <link.icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              )}
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
