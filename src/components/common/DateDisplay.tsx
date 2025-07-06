'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { ClientOnly } from './ClientOnly';

interface DateDisplayProps {
  date: string;
  className?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  className = 'text-xs text-muted-foreground flex items-center gap-1',
}) => {
  return (
    <div className={className}>
      <Calendar className="w-3 h-3" />
      <span>Updated </span>
      <ClientOnly fallback="...">
        {new Date(date).toLocaleDateString()}
      </ClientOnly>
    </div>
  );
};
