import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="text-6xl font-bold text-muted-foreground">404</div>
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or the GitHub user couldn't be found.
          </p>
        </div>

        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold">What you can do:</h2>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li>• Check if the GitHub username is spelled correctly</li>
              <li>• Make sure the user profile is public</li>
              <li>• Try searching for a different user</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Again
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
