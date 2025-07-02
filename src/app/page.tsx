'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (username: string) => {
    setLoading(true);
    try {
      router.push(`/user/${username}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} loading={loading} />
      <FeaturesSection />
      <CTASection onSearch={handleSearch} loading={loading} />
    </div>
  );
}
