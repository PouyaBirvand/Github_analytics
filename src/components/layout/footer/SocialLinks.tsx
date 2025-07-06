'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { footerData } from '@/lib/constants/footer';

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {footerData.socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 sm:p-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
        >
          <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
};
