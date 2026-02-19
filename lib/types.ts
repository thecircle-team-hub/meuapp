// Core data types for the X activity tracker

export interface User {
  id: string;
  fullName: string;
  nationality: string; // ISO country code (e.g., "US", "GB")
  twitterUsername: string; // Stored with @ prefix
  posts: number; // Simulated activity
  interactions: number; // Simulated activity
  totalScore: number; // posts + interactions
  createdAt: Date;
}

export interface Country {
  code: string; // ISO code
  name: string;
  flag: string; // Emoji flag
}

export interface CountryStats {
  code: string;
  name: string;
  flag: string;
  userCount: number;
  totalScore: number;
}
