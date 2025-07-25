'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber, formatDate } from '@/utils/helpers';
import { UserProfileProps } from '@/types/user-profile.types';
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  Building,
  Github,
  Users,
  BookOpen,
  Star,
} from 'lucide-react';
import Link from 'next/link';

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const stats = [
    {
      icon: BookOpen,
      label: 'Repositories',
      value: formatNumber(user.public_repos),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      label: 'Followers',
      value: formatNumber(user.followers),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Star,
      label: 'Following',
      value: formatNumber(user.following),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Github,
      label: 'Gists',
      value: formatNumber(user.public_gists),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
        {/* Hero Background */}
        <div className="relative h-24 sm:h-32 lg:h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                'linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)',
                'linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <CardContent className="relative -mt-12 sm:-mt-16 lg:-mt-20 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Avatar Section */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 border-background overflow-hidden bg-background shadow-2xl">
                  <Image
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* User Info Section */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-5 font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {user.name || user.login}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  @{user.login}
                </p>
                {user.bio && (
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto px-2">
                    {user.bio}
                  </p>
                )}
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <Card className="text-center p-3 sm:p-4 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                      <CardContent className="p-0 space-y-2">
                        <motion.div
                          className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </motion.div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-muted-foreground"
              >
                {user.company && (
                  <motion.div
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[120px] sm:max-w-none">
                      {user.company}
                    </span>
                  </motion.div>
                )}
                {user.location && (
                  <motion.div
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[120px] sm:max-w-none">
                      {user.location}
                    </span>
                  </motion.div>
                )}
                {user.blog && (
                  <motion.div
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LinkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <Link
                      href={
                        user.blog.startsWith('http')
                          ? user.blog
                          : `https://${user.blog}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none"
                    >
                      {user.blog}
                    </Link>
                  </motion.div>
                )}
                {user.email && (
                  <motion.div
                    className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[120px] sm:max-w-none">
                      {user.email}
                    </span>
                  </motion.div>
                )}
                <motion.div
                  className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Joined {formatDate(user.created_at)}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
