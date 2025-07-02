import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container py-32 space-y-8">
      {/* Profile Loading */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-muted rounded-full skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-muted rounded skeleton w-1/3" />
              <div className="h-4 bg-muted rounded skeleton w-1/2" />
              <div className="h-4 bg-muted rounded skeleton w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded skeleton w-20" />
                  <div className="h-8 bg-muted rounded skeleton w-16" />
                </div>
                <div className="w-12 h-12 bg-muted rounded-full skeleton" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="card-elevated">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded skeleton w-1/3 mb-4" />
              <div className="h-64 bg-muted rounded skeleton" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading GitHub data...</span>
        </div>
      </div>
    </div>
  );
}
