'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { missions } from '@/lib/constants/missions';

export const MissionSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-18 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Transforming GitHub Data Into
            <span className="block text-transparent pb-2 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
              Meaningful Insights
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            We believe that understanding your coding journey is essential for
            growth as a developer. Our platform bridges the gap between raw data
            and actionable intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30">
                <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                  <motion.div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-xl sm:rounded-2xl ${mission.bgColor} flex items-center justify-center mb-3 sm:mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <mission.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${mission.color}`}
                    />
                  </motion.div>
                  <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                    {mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
