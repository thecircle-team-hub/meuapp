'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Country } from '@/lib/types';
import { Loader2, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountryLeaderboardModalProps {
  countryCode: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CountryData {
  country: Country;
  users: User[];
  count: number;
}

export function CountryLeaderboardModal({
  countryCode,
  open,
  onOpenChange,
}: CountryLeaderboardModalProps) {
  const [data, setData] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countryCode || !open) {
      setData(null);
      return;
    }

    const fetchCountryData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/country/${countryCode}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('[v0] Error fetching country data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [countryCode, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {data && (
              <>
                <span className="text-3xl">{data.country.flag}</span>
                <span>{data.country.name} Leaderboard</span>
              </>
            )}
            {isLoading && <span>Loading...</span>}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            {data && (
              <>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {data.count} {data.count === 1 ? 'user' : 'users'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.country.code}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && data && (
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-3">
              {data.users.map((user, index) => {
                const rank = index + 1;

                return (
                  <div
                    key={user.id}
                    className={cn(
                      'flex items-center gap-4 rounded-lg border bg-card p-3 transition-all hover:bg-accent/50',
                      rank === 1 && 'border-primary/50 shadow-sm'
                    )}
                  >
                    {/* Rank */}
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold',
                        rank === 1
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      #{rank}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {user.fullName}
                        </span>
                        <span className="text-xl">{data.country.flag}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{user.twitterUsername}</span>
                        <span>•</span>
                        <span>
                          {user.posts} posts • {user.interactions} interactions
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {user.totalScore}
                      </div>
                      <div className="text-xs text-muted-foreground">pts</div>
                    </div>
                  </div>
                );
              })}

              {data.users.length === 0 && (
                <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 opacity-50" />
                    <p>No users from this country yet</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
