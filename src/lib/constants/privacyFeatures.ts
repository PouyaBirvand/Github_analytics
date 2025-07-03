import { Shield, Lock, Eye, Server, UserCheck, FileText } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface PrivacyFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  gradient: string;
}

export const privacyFeatures: PrivacyFeature[] = [
  {
    title: 'No Data Storage',
    description:
      'We process your GitHub data in real-time and never store any personal information or analytics results on our servers.',
    icon: Server,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Public Data Only',
    description:
      'We only access publicly available GitHub data through official APIs. Your private repositories and sensitive information remain secure.',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Secure Connections',
    description:
      'All data transmission is encrypted using HTTPS/TLS protocols, ensuring your information is protected during analysis.',
    icon: Lock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    title: 'No Tracking',
    description:
      "We don't use cookies, analytics trackers, or any other methods to monitor your browsing behavior or personal activities.",
    icon: UserCheck,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Open Source',
    description:
      'Our platform is built with transparency in mind. You can review our code and security practices on GitHub.',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'GDPR Compliant',
    description:
      'We follow international privacy standards and regulations, ensuring your rights are protected regardless of your location.',
    icon: Shield,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    gradient: 'from-pink-500 to-rose-500',
  },
];
