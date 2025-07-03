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
  title: 'About Us - GitHub Analytics | Learn About Our Mission & Team',
  description:
    'Discover the story behind GitHub Analytics, meet our team, and learn about our mission to help developers gain deeper insights into their coding journey.',
  keywords: [
    'about github analytics',
    'developer tools team',
    'github insights mission',
    'coding analytics platform',
    'developer productivity tools',
    'github data visualization',
    'open source analytics',
    'developer community',
  ],
  openGraph: {
    title: 'About GitHub Analytics - Our Mission & Team',
    description:
      'Meet the team behind GitHub Analytics and learn about our mission to empower developers with powerful insights.',
    type: 'website',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'GitHub Analytics Team',
      },
    ],
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
