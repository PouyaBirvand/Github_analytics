'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber, getLanguageColor } from '@/utils/helpers';
import { Repository } from '@/types/repository-list.types';
import { DateDisplay } from '@/components/common/DateDisplay';
import {
  Star,
  GitFork,
  ExternalLink,
  Eye,
} from 'lucide-react';

interface RepositoryCardProps {
  repo: Repository;
  index: number;
  viewMode: 'grid' | 'list';
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repo,
  index,
  viewMode,
}) => {
  return (
    <motion.div
      key={repo.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Card
        className={`
          h-full border-0 bg-gradient-to-br from-background to-muted/20
          hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500
          hover:-translate-y-1 overflow-hidden
          ${viewMode === 'list' ? 'flex flex-row' : ''}
        `}
      >
        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div
            className={`space-y-4 ${
              viewMode === 'list' ? 'flex items-center justify-between' : ''
            }`}
          >
            {/* Repository Header */}
            <div className={viewMode === 'list' ? 'flex-1' : ''}>
              <div className="flex items-start justify-between mb-3">
                <motion.h3
                  className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    {repo.name}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.h3>
                {repo.private && (
                  <span className="px-2 py-1 text-xs bg-orange-500/10 text-orange-600 rounded-full border border-orange-500/20">
                    Private
                  </span>
                )}
              </div>
              {repo.description && (
                <p
                  className={`text-sm text-muted-foreground leading-relaxed ${
                    viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-2'
                  }`}
                >
                  {repo.description}
                </p>
              )}
            </div>

            {/* Repository Stats */}
            <div
              className={`flex items-center gap-4 text-sm text-muted-foreground ${
                viewMode === 'list' ? 'flex-shrink-0' : 'flex-wrap'
              }`}
            >
              {repo.language && (
                <motion.div
                  className="flex items-center gap-2 px-2 py-1 bg-muted/30 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{
                      backgroundColor: getLanguageColor(repo.language),
                    }}
                  />
                  <span className="font-medium">{repo.language}</span>
                </motion.div>
              )}
              <motion.div
                className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-4 h-4" />
                <span className="font-medium">
                  {formatNumber(repo.stargazers_count)}
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-600 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <GitFork className="w-4 h-4" />
                <span className="font-medium">
                  {formatNumber(repo.forks_count)}
                </span>
              </motion.div>
              {repo.size > 0 && (
                <motion.div
                  className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">
                    {formatNumber(repo.watchers_count)}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Topics */}
            {repo.topics &&
              repo.topics.length > 0 &&
              viewMode === 'grid' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {repo.topics.slice(0, 3).map(topic => (
                    <motion.span
                      key={topic}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </motion.div>
              )}

            {/* Updated Date - Fixed Hydration Issue */}
            <DateDisplay date={repo.updated_at} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
