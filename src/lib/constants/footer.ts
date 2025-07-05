import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Home,
  Info,
  Swords,
} from 'lucide-react';

export const footerData = {
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:contact@githubanalytics.com',
      icon: Mail,
    },
  ],

  features: [
    'Developer Battle Rankings',
    'Language Statistics',
    'Commit Activity Analysis',
    'Repository Insights',
    'Contribution Heatmap',
    'Profile Comparisons',
    'Trend Visualization',
    'Export Reports',
    'Real-time Data',
  ],

  quickLinks: [
    {
      label: 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: 'About',
      href: '/about',
      icon: Info,
    },
    {
      label: 'Battle',
      href: '/battle',
      icon: Swords,
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: Github,
      external: true,
    },
  ],
};
