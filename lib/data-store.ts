// In-memory data store for demo purposes
// This can be easily replaced with a real database later

import { User, CountryStats } from './types';
import { getCountryByCode } from './countries';

// In-memory storage (will reset on server restart)
let users: User[] = [];

// Generate some mock users for demo
function generateMockUsers(): User[] {
  const mockData = [
    { name: 'John Smith', country: 'US', twitter: '@johnsmith', posts: 145, interactions: 195 },
    { name: 'Emma Johnson', country: 'GB', twitter: '@emmaj', posts: 132, interactions: 178 },
    { name: 'Michael Chen', country: 'CN', twitter: '@michaelchen', posts: 189, interactions: 201 },
    { name: 'Sophie Martin', country: 'FR', twitter: '@sophiemartin', posts: 98, interactions: 143 },
    { name: 'Liam Brown', country: 'CA', twitter: '@liambrown', posts: 167, interactions: 188 },
    { name: 'Olivia Davis', country: 'AU', twitter: '@oliviadavis', posts: 121, interactions: 156 },
    { name: 'Noah Wilson', country: 'US', twitter: '@noahwilson', posts: 154, interactions: 172 },
    { name: 'Ava Martinez', country: 'ES', twitter: '@avamartinez', posts: 109, interactions: 134 },
    { name: 'Ethan Anderson', country: 'US', twitter: '@ethananderson', posts: 143, interactions: 169 },
    { name: 'Isabella Garcia', country: 'MX', twitter: '@isabellagarcia', posts: 87, interactions: 112 },
    { name: 'Mason Lee', country: 'KR', twitter: '@masonlee', posts: 176, interactions: 193 },
    { name: 'Sophia Taylor', country: 'GB', twitter: '@sophiataylor', posts: 134, interactions: 151 },
    { name: 'Lucas Müller', country: 'DE', twitter: '@lucasmuller', posts: 156, interactions: 178 },
    { name: 'Mia Schmidt', country: 'DE', twitter: '@miaschmidt', posts: 142, interactions: 165 },
    { name: 'Alexander Petrov', country: 'RU', twitter: '@alexpetrov', posts: 98, interactions: 127 },
    { name: 'Charlotte Wang', country: 'CN', twitter: '@charlottewang', posts: 164, interactions: 187 },
    { name: 'Benjamin Silva', country: 'BR', twitter: '@bensilva', posts: 119, interactions: 141 },
    { name: 'Amelia Rossi', country: 'IT', twitter: '@ameliarossi', posts: 127, interactions: 149 },
    { name: 'James O\'Brien', country: 'IE', twitter: '@jamesobrien', posts: 156, interactions: 173 },
    { name: 'Harper Nakamura', country: 'JP', twitter: '@harpernakamura', posts: 189, interactions: 214 },
  ];

  return mockData.map((mock, index) => ({
    id: `user_${index + 1}`,
    fullName: mock.name,
    nationality: mock.country,
    twitterUsername: mock.twitter,
    posts: mock.posts,
    interactions: mock.interactions,
    totalScore: mock.posts + mock.interactions,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
  }));
}

// Initialize with mock data
users = generateMockUsers();

// CRUD Operations

export function getAllUsers(): User[] {
  return [...users].sort((a, b) => b.totalScore - a.totalScore);
}

export function getUsersByCountry(countryCode: string): User[] {
  return users
    .filter((u) => u.nationality === countryCode)
    .sort((a, b) => b.totalScore - a.totalScore);
}

export function addUser(userData: Omit<User, 'id' | 'totalScore' | 'createdAt'>): User {
  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    totalScore: userData.posts + userData.interactions,
    createdAt: new Date(),
  };
  
  users.push(newUser);
  return newUser;
}

export function getCountryStats(): CountryStats[] {
  const statsMap = new Map<string, CountryStats>();

  users.forEach((user) => {
    const existing = statsMap.get(user.nationality);
    const country = getCountryByCode(user.nationality);

    if (!country) return;

    if (existing) {
      existing.userCount += 1;
      existing.totalScore += user.totalScore;
    } else {
      statsMap.set(user.nationality, {
        code: user.nationality,
        name: country.name,
        flag: country.flag,
        userCount: 1,
        totalScore: user.totalScore,
      });
    }
  });

  return Array.from(statsMap.values()).sort((a, b) => b.userCount - a.userCount);
}

export function getTotalUsers(): number {
  return users.length;
}

// Get max user count for a single country (for map color scaling)
export function getMaxCountryUserCount(): number {
  const stats = getCountryStats();
  return stats.length > 0 ? Math.max(...stats.map((s) => s.userCount)) : 0;
}
