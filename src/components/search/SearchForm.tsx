'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVariantStyles } from '@/lib/constants/styles';
import { SearchFormProps } from '@/types/search-form.types';

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  loading = false,
  variant = 'default',
}) => {
  const [username, setUsername] = useState('');
  const styles = getVariantStyles(variant);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="relative flex-1">
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
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className={`${styles.sparkles} text-primary/50`} />
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
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">
                  {variant === 'hero' ? 'Analyze Profile' : 'Analyze'}
                </span>
                <span className="sm:hidden">
                  {variant === 'hero' ? 'Analyze' : 'Go'}
                </span>
                {variant !== 'default' && (
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                )}
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
