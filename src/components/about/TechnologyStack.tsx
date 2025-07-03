'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { techStackData } from '@/lib/constants/techStack';

export const TechnologyStack: React.FC = () => {
  return (
    <section className="py-16 sm:py-18 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Built With Modern Technology
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-0">
            Leveraging cutting-edge technologies to deliver fast, reliable, and
            beautiful analytics
          </p>
        </motion.div>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
          <CardHeader className="text-center pb-6 sm:pb-8 p-4 sm:p-6 md:p-8">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Our Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {techStackData.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <motion.div
                      className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg ${tech.bgGradient}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="text-white text-2xl sm:text-3xl w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
                    </motion.div>
                    <h4 className="font-bold text-sm sm:text-base md:text-lg group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
                      {tech.description}
                    </p>
                    <div className="mt-2 sm:mt-3 flex flex-wrap justify-center gap-1">
                      {tech.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-muted/50 rounded-full text-muted-foreground hidden md:inline-block"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl border border-border/50"
            >
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-center">
                Why These Technologies?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground text-sm sm:text-base">
                    Performance & Speed
                  </h5>
                  <p>
                    Next.js 15 with App Router provides lightning-fast page
                    loads and optimal SEO performance.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground text-sm sm:text-base">
                    Developer Experience
                  </h5>
                  <p>
                    TypeScript ensures type safety while Tailwind CSS enables
                    rapid UI development.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground text-sm sm:text-base">
                    User Experience
                  </h5>
                  <p>
                    Framer Motion creates smooth animations and Recharts
                    provides interactive visualizations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground text-sm sm:text-base">
                    Scalability
                  </h5>
                  <p>
                    Modern architecture ensures the platform can grow with our
                    user base and feature set.
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
