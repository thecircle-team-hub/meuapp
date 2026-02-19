'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { countries } from '@/lib/countries';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !nationality || !twitterUsername) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate Twitter username
    const cleanUsername = twitterUsername.trim();
    if (cleanUsername.length < 2) {
      toast.error('Please enter a valid Twitter username');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          nationality,
          twitterUsername: cleanUsername,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const user = await response.json();
      
      toast.success(`Successfully registered! Your activity score: ${user.totalScore} pts`);
      
      // Reset form
      setFullName('');
      setNationality('');
      setTwitterUsername('');
      
      // Notify parent component
      onSuccess?.();
    } catch (error) {
      console.error('[v0] Registration error:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UserPlus className="h-6 w-6 text-primary" />
          Register for Testing
        </CardTitle>
        <CardDescription className="text-base">
          Join the X activity tracking test platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Select value={nationality} onValueChange={setNationality} required>
              <SelectTrigger id="nationality" className="bg-background">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">X (Twitter) Username</Label>
            <Input
              id="twitter"
              type="text"
              placeholder="@username"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
              required
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Enter your Twitter/X username (with or without @)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
