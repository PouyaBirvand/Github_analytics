'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Laptop },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg hover:bg-accent/50 transition-all duration-300"
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CurrentIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 sm:w-48 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl"
      >
        {themes.map((themeOption, index) => {
          const Icon = themeOption.icon;
          return (
            <motion.div
              key={themeOption.value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DropdownMenuItem
                onClick={() => setTheme(themeOption.value)}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 cursor-pointer transition-all duration-200 ${
                  theme === themeOption.value
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-accent/50'
                }`}
              >
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium text-sm sm:text-base">
                  {themeOption.label}
                </span>
                {theme === themeOption.value && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </DropdownMenuItem>
            </motion.div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
