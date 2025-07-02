'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFormProps {
  onSearch: (username: string) => void;
  loading?: boolean;
  variant?: 'default' | 'hero' | 'cta';
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  loading = false,
  variant = 'default',
}) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'w-full max-w-2xl mx-auto',
          input:
            'h-14 text-lg pl-4 bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-2xl shadow-lg',
          button:
            'h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg',
          icon: 'w-6 h-6 left-4',
        };
      case 'cta':
        return {
          container: 'w-full max-w-xl mx-auto',
          input:
            'h-12 pl-12 bg-white/10 backdrop-blur-sm border-white/20 focus:border-white/40 text-white placeholder:text-white/70 rounded-xl',
          button:
            'h-12 px-6 bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-xl',
          icon: 'w-5 h-5 left-3 text-white/70',
        };
      default:
        return {
          container: 'w-full max-w-md mx-auto',
          input: 'h-10 pl-10',
          button: 'h-10 px-4',
          icon: 'w-4 h-4 left-3',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${styles.icon}`}
          />
          <Input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
          {variant === 'hero' && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-primary/50" />
            </motion.div>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            disabled={loading || !username.trim()}
            className={styles.button}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {variant === 'hero' ? 'Analyze Profile' : 'Analyze'}
                {variant !== 'default' && <Search className="w-4 h-4 ml-2" />}
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
