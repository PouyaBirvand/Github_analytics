'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import NextTopLoader from 'nextjs-toploader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="#9333ea"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={300}
        shadow="0 0 10px #9333ea,0 0 5px #9333ea"
      />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
      >
        {children}
      </ThemeProvider>
    </>
  );
}
