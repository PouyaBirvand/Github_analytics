'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  Icon?: LucideIcon;
  TrailingIcon?: LucideIcon;
  external?: boolean;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  variant = 'primary',
  Icon,
  TrailingIcon,
  external = false,
  className = '',
}) => {
  const baseClasses =
    'group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300';

  const variants = {
    primary:
      'bg-white text-gray-900 hover:bg-gray-100 shadow-2xl hover:shadow-white/20 font-bold',
    secondary:
      'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20',
  };

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...linkProps}
      >
        {Icon && (
          <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        )}
        {children}
        {TrailingIcon && (
          <TrailingIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </Link>
    </motion.div>
  );
};
