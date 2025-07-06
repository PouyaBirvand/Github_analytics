'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { privacyFeatures } from '@/lib/constants/privacyFeatures';
import { SecurityCommitmentCard } from './SecurityCommitmentCard';

export const PrivacySecurity: React.FC = () => {
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
          <div className="flex justify-center mb-4 sm:mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="p-3 sm:p-4 bg-green-500/10 rounded-full"
            >
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />
            </motion.div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Privacy & Security
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mt-2">
              First Approach
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Your privacy and data security are our top priorities. We've built
            our platform with privacy-by-design principles to ensure your
            information stays safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card className="h-full group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <motion.div
                      className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto rounded-xl sm:rounded-2xl ${feature.bgColor} flex items-center justify-center relative`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div
                        className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                      />
                      <feature.icon
                        className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${feature.color} relative z-10`}
                      />
                    </motion.div>
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <motion.div
                      className={`w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Security Commitment Card */}

        <SecurityCommitmentCard />
      </div>
    </section>
  );
};
