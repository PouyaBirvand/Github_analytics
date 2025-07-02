import { ComponentType } from "react";
import { SiChartdotjs, SiFramer, SiGithub, SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

export interface TechStackItem {
    name: string;
    icon: ComponentType;
    description: string;
    bgGradient: string;
    features: string[];
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment';
  }
  
  export const techStackData: TechStackItem[] = [
    {
      name: 'Next.js 15',
      icon: SiNextdotjs,
      description: 'React Framework',
      bgGradient: 'bg-gradient-to-r from-black to-gray-800',
      features: ['App Router', 'SSR', 'API Routes', 'Performance'],
      category: 'frontend'
    },
    {
      name: 'TypeScript',
      icon: SiTypescript,
      description: 'Type Safety',
      bgGradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
      features: ['Type Safety', 'IntelliSense', 'Refactoring', 'Scalability'],
      category: 'frontend'
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      description: 'Utility-First CSS',
      bgGradient: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      features: ['Utility Classes', 'Responsive', 'Dark Mode', 'Customizable'],
      category: 'frontend'
    },
    {
      name: 'Framer Motion',
      icon: SiFramer,
      description: 'Animation Library',
      bgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      features: ['Smooth Animations', 'Gestures', 'Layout Animations', 'Performance'],
      category: 'frontend'
    },
    {
      name: 'Recharts',
      icon: SiChartdotjs,
      description: 'Data Visualization',
      bgGradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
      features: ['Interactive Charts', 'Responsive', 'Customizable', 'Lightweight'],
      category: 'frontend'
    },
    {
      name: 'GitHub API',
      icon: SiGithub,
      description: 'Data Source',
      bgGradient: 'bg-gradient-to-r from-gray-700 to-gray-900',
      features: ['REST API', 'GraphQL', 'Real-time', 'Comprehensive'],
      category: 'backend'
    }
  ];