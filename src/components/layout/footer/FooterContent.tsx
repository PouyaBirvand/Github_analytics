'use client';

import React from 'react';
import { FooterBottom } from './FooterBottom';
import { NewsletterForm } from '@/components/home/NewsletterForm';
import { FooterGrid } from './FooterGrid';

export const FooterContent: React.FC = () => {
  return (
    <div className="relative z-10 container px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <FooterGrid />

      <div className="mb-8 sm:mb-12">
        <NewsletterForm />
      </div>

      <FooterBottom />
    </div>
  );
};
