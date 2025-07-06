'use client';

import React from 'react';
import { BrandSection } from './BrandSection';
import { FeaturesSection } from './FeaturesSection';
import { QuickLinksSection } from './QuickLinksSection';

export const FooterGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
      <BrandSection />
      <FeaturesSection />
      <QuickLinksSection />
    </div>
  );
};
