import { Swords, LucideIcon } from 'lucide-react';

export interface NavigationItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/battle', label: 'Battle', icon: Swords },
];
