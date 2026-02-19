'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from '@/lib/types';
import { getFlagEmoji } from '@/lib/countries';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobalLeaderboardProps {
  users: User[];
}

export function GlobalLeaderboard({ users }: GlobalLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  const getRankBadgeClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 2:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
      case 3:
        return 'bg-amber-700/10 text-amber-700 border-amber-700/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Award className="h-6 w-6 text-primary" />
          Global Leaderboard
        </CardTitle>
        <CardDescription className="text-base">
          Top users by activity score
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {users.map((user, index) => {
              const rank = index + 1;
              const flag = getFlagEmoji(user.nationality);

              return (
                <div
                  key={user.id}
                  className={cn(
                    'flex items-center gap-4 rounded-lg border bg-background/50 p-4 transition-all hover:bg-accent/50',
                    rank <= 3 && 'border-2 shadow-sm'
                  )}
                >
                  {/* Rank */}
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold',
                      getRankBadgeClass(rank)
                    )}
                  >
                    {getRankIcon(rank) || `#${rank}`}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {user.fullName}
                      </span>
                      <span className="text-xl" title={user.nationality}>
                        {flag}
                      </span>
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
                    <div className="text-2xl font-bold text-primary">
                      {user.totalScore}
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              );
            })}
          </div>

          {users.length === 0 && (
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Trophy className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p className="text-lg">No users registered yet</p>
                <p className="text-sm">Be the first to register!</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
