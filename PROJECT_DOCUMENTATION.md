# X Activity Tracker - Test Platform

**IMPORTANT: This is a testing platform only. It is NOT a production system.**

## Overview

A comprehensive engagement tracking test platform for monitoring X (Twitter) user activity with interactive world map visualization, country-based leaderboards, and advanced scoring systems.

## Core Features

### 1. Registration System
- Simple user registration with full name, nationality, and X username
- No authentication, email, or wallet integration (test mode)
- Validates Twitter username format
- Supports 50+ countries with flag emojis

### 2. Activity Tracking & Scoring

#### Advanced User Metrics
Each user tracks:
- Posts, replies, reposts, likes, community posts
- Alignment score (narrative-aligned content)
- Penalty points (spam violations)
- Total score (calculated from all activities)
- User level (Observer → Elite Contributor)
- Streak days (consecutive active days)
- Engagement ratio (% of aligned activity)

#### Scoring Engine (`lib/scoring-engine.ts`)
Configurable point values for all activity types:

**Posts:**
- Base post: 10 pts
- Narrative aligned: 15 pts
- With hashtag + mention: 20 pts
- High quality (200+ chars): 25 pts
- Bonus multiplier for 2+ alignment signals

**Replies:**
- Basic: 5 pts
- Long (150+ chars): 10 pts
- Strategic: 15 pts

**Reposts:**
- Basic: 5 pts
- With commentary: 12 pts
- Strategic: 18 pts

**Community Posts:**
- Thread: 15 pts
- Discussion: 10 pts
- Poll: 5 pts

**Likes:** 1 pt each

**Streak Bonuses:**
- 3-day streak: +10 pts
- 7-day streak: +25 pts
- 30-day streak: +100 pts

### 3. Narrative Validation (`lib/alignment-validator.ts`)

Tracks alignment with:
- **Profile:** @Leanish100xHunt
- **Community:** https://twitter.com/i/communities/1996098906606702626
- **Narrative Post:** https://x.com/i/status/2024063049645089058
- **Approved Hashtags:** #TheCircle, #CircleMovement, #ProofOfAlignment

Content is aligned if it contains at least ONE of the above.
Bonus multiplier applied for 2+ alignment signals.

### 4. Anti-Spam System (`lib/spam-detector.ts`)

Detects and penalizes:
- **Duplicate content** (within 30 min window)
- **Mass activity** (10+ posts in 5 minutes)
- **Short content** (under 10 characters)
- **Hashtag spam** (80%+ hashtags)

Penalty escalation:
- First violation: 0 pts (warning)
- Second violation: -10 pts
- Severe spam: -30 pts

### 5. User Level System

Automatic level classification based on total score:

| Score Range | Level |
|------------|-------|
| 0-50 | Observer 👀 |
| 51-150 | Contributor ✍️ |
| 151-300 | Active Member ⚡ |
| 301-600 | Strategic Member 🎯 |
| 601-1000 | Core Aligned 💎 |
| 1000+ | Elite Contributor 👑 |

### 6. Global Leaderboard
Displays all users ranked by total score with:
- Rank position with special badges for top 3
- Full name, Twitter username, country flag
- Level badge with emoji
- Alignment percentage (color-coded)
- Activity breakdown (posts, replies, reposts, community)
- Streak indicator (fire emoji if active)
- Total score

### 7. Interactive World Map
- Color-scaled by user count (teal → blue → purple gradient)
- Dynamic color intensity based on country density
- Hover to see country name and user count
- Click to open country-specific leaderboard modal

### 8. Country Leaderboard Modal
Shows country-specific data:
- Total users in country
- Average score
- Total country engagement
- Top ranked member
- Complete country leaderboard with same details as global

### 9. Admin Control Panel (`/admin`)

**No authentication required (test mode only)**

Features:
- **Scoring Configuration:** Adjust all point values in real-time
- **Narrative Management:** Update tracked profiles, community, hashtags
- **Spam Detection Toggle:** Enable/disable anti-spam system
- **Hashtag Management:** Add/remove approved hashtags
- **User Management:** Reset scores, clear violations, delete users
- **Export:** Download complete leaderboard as JSON
- **Reset:** Restore default configuration

## Architecture

### Clean Modular Structure

```
lib/
├── types.ts                    # TypeScript interfaces
├── countries.ts                # Country data with flags
├── scoring-engine.ts           # Scoring calculations
├── alignment-validator.ts      # Narrative validation
├── spam-detector.ts            # Anti-spam detection
├── streak-service.ts           # Streak tracking
├── data-store.ts               # In-memory storage
├── country-stats-service.ts    # Country statistics
└── api-integration-service.ts  # Future X API integration
```

### Data Flow

1. User registers → Stored in data-store
2. Activity simulated with mock data
3. Scoring engine calculates points
4. Alignment validator checks narrative match
5. Spam detector applies penalties
6. Streak service updates consecutive days
7. Stats aggregated for leaderboards and map
8. UI updates in real-time via SWR

### Future-Ready Design

**API Integration Service** (`lib/api-integration-service.ts`)

Placeholder functions ready for real X API:
- `fetchUserPosts(username)` - Get user tweets
- `fetchUserReplies(username)` - Get user replies
- `fetchUserRetweets(username)` - Get retweets
- `fetchUserCommunityActivity(username, communityId)` - Get community posts
- `validatePostAlignment(post)` - Check narrative alignment
- `calculateEngagementScore(username)` - Aggregate all activity
- `syncUserData(username)` - Main sync function

All functions are documented with TODO comments for X API v2 integration.

## Technology Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI
- **Maps:** react-simple-maps with world-atlas
- **Data Fetching:** SWR for real-time updates
- **State Management:** React hooks + SWR
- **Notifications:** Sonner (toast)

## Data Storage

Currently uses **in-memory storage** that:
- Resets on server restart
- Perfect for testing and demos
- Includes 20 mock users for demonstration
- Easy to replace with real database (PostgreSQL, MongoDB, etc.)

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Access

Visit [http://localhost:3000/admin](http://localhost:3000/admin) for the control panel.

## Key Files

### API Routes
- `/api/users` - User CRUD operations
- `/api/users/country/[code]` - Country-specific users
- `/api/stats` - Global statistics
- `/api/admin/config` - Admin configuration management
- `/api/admin/users` - Admin user management
- `/api/admin/export` - Export leaderboard data

### Components
- `components/registration-form.tsx` - User registration
- `components/global-leaderboard.tsx` - Main leaderboard
- `components/world-map.tsx` - Interactive world map
- `components/country-leaderboard-modal.tsx` - Country leaderboard
- `app/admin/page.tsx` - Admin control panel

## Deployment

Can be deployed to:
- **Vercel** (recommended, one-click deploy)
- **Netlify**
- **Any Node.js hosting**

## Future Enhancements

1. **X API Integration**
   - Replace mock data with real X API v2
   - Implement authentication (Bearer Token)
   - Real-time activity syncing
   - Rate limiting handling

2. **Database Integration**
   - Replace in-memory store with PostgreSQL/MongoDB
   - Add persistence layer
   - Implement caching strategy

3. **Authentication**
   - Add admin authentication
   - User login system
   - Role-based access control

4. **Advanced Features**
   - Real-time WebSocket updates
   - Historical trend charts
   - User profile pages
   - Achievement badges
   - Leaderboard filtering and search

5. **DAO Governance**
   - Blockchain integration
   - Insignia tokens
   - Voting mechanisms
   - Reputation systems

## Testing Notes

This is a **testing platform only**. All data is temporary. The system demonstrates:
- Sophisticated scoring algorithms
- Multi-factor engagement tracking
- Spam detection and prevention
- Geographic visualization
- Admin configuration management
- Scalable architecture

Perfect for prototyping, demos, and planning real production systems.

## License

This is a test platform for demonstration purposes.

## Support

For questions or issues, refer to the admin panel or check the inline code documentation.
