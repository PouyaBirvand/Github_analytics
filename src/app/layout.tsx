import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Analytics - Analyze GitHub Profiles',
  description:
    'Analyze GitHub profiles with beautiful visualizations, language statistics, commit patterns, and repository insights.',
  keywords: [
    'GitHub',
    'Analytics',
    'Developer',
    'Statistics',
    'Visualization',
    'Profile',
  ],
  authors: [{ name: 'GitHub Analytics' }],
  creator: 'GitHub Analytics',
  publisher: 'GitHub Analytics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github-analytics-five.vercel.app/',
    title: 'GitHub Analytics - Analyze GitHub Profiles',
    description:
      'Analyze GitHub profiles with beautiful visualizations, language statistics, commit patterns, and repository insights.',
    siteName: 'GitHub Analytics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Analytics - Analyze GitHub Profiles',
    description:
      'Analyze GitHub profiles with beautiful visualizations, language statistics, commit patterns, and repository insights.',
    creator: '@Pouyaphernia',
  },
  icons: {
    icon: './github.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
