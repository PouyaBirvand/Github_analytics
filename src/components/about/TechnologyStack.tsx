'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { techStackData } from '@/lib/constants/techStack';

export const TechnologyStack: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built With Modern Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leveraging cutting-edge technologies to deliver fast, reliable, and beautiful analytics
          </p>
        </motion.div>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold">Our Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                      className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${tech.bgGradient}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="text-white text-3xl w-10 h-10" />
                    </motion.div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      {tech.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-muted/50 rounded-full text-muted-foreground"
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
              className="mt-12 p-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl border border-border/50"
            >
              <h4 className="font-bold text-lg mb-4 text-center">Why These Technologies?</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground">Performance & Speed</h5>
                  <p>Next.js 15 with App Router provides lightning-fast page loads and optimal SEO performance.</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground">Developer Experience</h5>
                  <p>TypeScript ensures type safety while Tailwind CSS enables rapid UI development.</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground">User Experience</h5>
                  <p>Framer Motion creates smooth animations and Recharts provides interactive visualizations.</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground">Scalability</h5>
                  <p>Modern architecture ensures the platform can grow with our user base and feature set.</p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
