import React from 'react';
import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionSection } from '@/components/about/MissionSection';
import { FeaturesGrid } from '@/components/about/FeaturesGrid';
import { TechnologyStack } from '@/components/about/TechnologyStack';
import { PrivacySecurity } from '@/components/about/PrivacySecurity';
import { TeamSection } from '@/components/about/TeamSection';
import { CallToAction } from '@/components/about/CallToAction';

export const metadata: Metadata = {
  title: 'About - GitHub Analytics',
  description: 'Learn more about GitHub Analytics and how we help developers analyze their GitHub profiles with beautiful visualizations.',
  keywords: ['GitHub Analytics', 'Developer Tools', 'Code Analysis', 'Open Source'],
  openGraph: {
    title: 'About GitHub Analytics',
    description: 'Discover how we transform GitHub data into meaningful insights for developers worldwide.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionSection />
      <FeaturesGrid />
      <TechnologyStack />
      <TeamSection />
      <PrivacySecurity />
      <CallToAction />
    </div>
  );
}
