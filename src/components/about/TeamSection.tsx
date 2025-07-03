'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { teamData } from '@/lib/constants/team';
import { GithubSocials } from './GithubSocials';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-18 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0">
            Passionate developers and designers working together to create the
            best GitHub analytics experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 overflow-hidden h-full">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                          {member.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm sm:text-base">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <GithubSocials member={member} />

                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-xs px-2 sm:px-3 py-1 bg-muted/50 text-muted-foreground rounded-full">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
