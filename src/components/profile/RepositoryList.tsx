'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Repository } from '@/types/github';
import { formatNumber, getLanguageColor } from '@/lib/utils';
import {
  Star,
  GitFork,
  ExternalLink,
  Code,
  Calendar,
  Eye,
  Filter,
  Grid,
  List,
} from 'lucide-react';

interface RepositoryListProps {
  repositories: Repository[];
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name' | 'forks'>(
    'stars'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortedRepos = [...repositories].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'updated':
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'name':
        return a.name.localeCompare(b.name);
      case 'forks':
        return b.forks_count - a.forks_count;
      default:
        return 0;
    }
  });

  const displayedRepos = showAll ? sortedRepos : sortedRepos.slice(0, 6);

  const sortOptions = [
    { value: 'stars', label: 'Stars', icon: Star },
    { value: 'updated', label: 'Updated', icon: Calendar },
    { value: 'name', label: 'Name', icon: Code },
    { value: 'forks', label: 'Forks', icon: GitFork },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <motion.div
                  className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Top Repositories
                </span>
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Showcase of your most popular projects
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
                <Filter className="w-4 h-4 text-muted-foreground ml-2" />
                {sortOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy(option.value as any)}
                    className="gap-1 text-xs"
                  >
                    <option.icon className="w-3 h-3" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {displayedRepos.map((repo, index) => (
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
                    <CardContent
                      className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}
                    >
                      <div
                        className={`space-y-4 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                      >
                        {/* Repository Header */}
                        <div className={viewMode === 'list' ? 'flex-1' : ''}>
                          <div className="flex items-start justify-between mb-3">
                            <motion.h3
                              className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1"
                              whileHover={{ scale: 1.02 }}
                            >
                              <a
                                href={repo.html_url}
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
                                viewMode === 'list'
                                  ? 'line-clamp-1'
                                  : 'line-clamp-2'
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
                                  backgroundColor: getLanguageColor(
                                    repo.language
                                  ),
                                }}
                              />
                              <span className="font-medium">
                                {repo.language}
                              </span>
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

                        {/* Updated Date */}
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Updated{' '}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Show More/Less Button */}
          {repositories.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="group gap-2 px-6 py-3 bg-gradient-to-r from-background to-muted/30 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showAll ? '↑' : '↓'}
                </motion.div>
                {showAll
                  ? 'Show Less'
                  : `Show All ${repositories.length} Repositories`}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
