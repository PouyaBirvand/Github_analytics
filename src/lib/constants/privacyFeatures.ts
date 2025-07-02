import { Eye, Github, Lock, Server, Shield, UserCheck } from "lucide-react";

export const privacyFeatures = [
    {
      icon: Shield,
      title: 'Data Privacy',
      description: 'We only access publicly available GitHub data. No private repositories, personal information, or sensitive data is ever accessed or stored.',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Github,
      title: 'GitHub API',
      description: 'All data is fetched directly from GitHub\'s official API in real-time, ensuring accuracy and respecting GitHub\'s rate limits and terms of service.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: 'Secure Processing',
      description: 'All data processing happens in real-time without permanent storage. Your information is processed securely and never cached on our servers.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Our platform is built with transparency in mind. We clearly show what data we access and how we use it to generate your analytics.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Server,
      title: 'No Data Storage',
      description: 'We don\'t store any user data or GitHub information. Every analysis is performed on-demand and results are not saved anywhere.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: UserCheck,
      title: 'GDPR Compliant',
      description: 'Our platform is fully compliant with GDPR and other privacy regulations, ensuring your data rights are always protected.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];