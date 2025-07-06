'use client';

import React from 'react';
import { FooterContent } from './footer/FooterContent';
import { FooterBackground } from './footer/FooterBackground';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <FooterBackground />
      <FooterContent />
    </footer>
  );
};
