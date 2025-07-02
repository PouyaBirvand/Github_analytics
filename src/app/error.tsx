'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="text-muted-foreground">
            We encountered an error while loading the GitHub data. This might be
            due to:
          </p>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Possible causes:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground text-left">
            <p>• GitHub API rate limit exceeded</p>
            <p>• Network connection issues</p>
            <p>• User profile is private or doesn't exist</p>
            <p>• Temporary server error</p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">
                Error Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-left overflow-auto p-4 bg-muted rounded">
                {error.message}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
