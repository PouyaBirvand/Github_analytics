'use client';

import { Eye, Lock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { motion } from 'framer-motion';

export const SecurityCommitmentCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 shadow-2xl">
        <CardHeader className="text-center pb-4 sm:pb-6 p-4 sm:p-6 md:p-8">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold flex items-center justify-center gap-2 sm:gap-3">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            Our Security Commitment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-green-600 flex items-center gap-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                What We Do
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Use only public GitHub API endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Process data in real-time without storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Implement secure HTTPS connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Follow GitHub's API guidelines strictly</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-red-600 flex items-center gap-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                What We Don't Do
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Access private repositories or data</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Store any user data or analytics results</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Share data with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Track users or collect personal information</span>
                </li>
              </ul>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl border border-border/50"
          >
            <p className="text-center text-sm sm:text-base text-muted-foreground">
              <strong className="text-foreground">
                Questions about our privacy practices?
              </strong>
              <br />
              We're committed to transparency. Feel free to reach out if you
              have any concerns about how we handle data.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
