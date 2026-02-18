# X Activity Tracker - Quick Start Guide

## What This Is

A **testing platform** for tracking X (Twitter) user activity with:
- Interactive world map showing user distribution
- Global and country-specific leaderboards
- Advanced scoring system with levels and streaks
- Anti-spam detection
- Admin control panel for configuration
- Mock data for demonstration

**⚠️ TESTING PURPOSES ONLY - NOT A PRODUCTION SYSTEM**

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

### 3. Open Your Browser
- Main App: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## Main Features

### For Users (Main Page)
1. **Register** - Fill in name, country, Twitter username
2. **View Leaderboard** - See rankings with scores, levels, and alignment
3. **Explore Map** - Click countries to view their leaderboards
4. **Track Stats** - View total users and countries

### For Admins (Admin Panel)
1. **Scoring Tab** - Adjust point values for all activities
2. **Narrative Tab** - Manage tracked profiles and hashtags
3. **Users Tab** - Reset scores, clear violations, delete users
4. **Export Tab** - Download leaderboard as JSON

## Key Concepts

### User Levels
- Observer (0-50 pts) 👀
- Contributor (51-150 pts) ✍️
- Active Member (151-300 pts) ⚡
- Strategic Member (301-600 pts) 🎯
- Core Aligned (601-1000 pts) 💎
- Elite Contributor (1000+ pts) 👑

### Activity Scoring
- **Posts:** 10-25 points (based on quality and alignment)
- **Replies:** 5-15 points (based on length and strategy)
- **Reposts:** 5-18 points (with/without commentary)
- **Community Posts:** 5-15 points (threads, discussions, polls)
- **Likes:** 1 point each
- **Streaks:** Bonus for consecutive active days

### Narrative Alignment
Content is aligned if it contains:
- @Leanish100xHunt
- Community link (1996098906606702626)
- Narrative post link (2024063049645089058)
- Approved hashtags (#TheCircle, #CircleMovement, #ProofOfAlignment)

### Anti-Spam System
Detects and penalizes:
- Duplicate content
- Mass posting
- Very short content
- Hashtag-only spam

## Tracked Information

### Tracked Profile
https://x.com/Leanish100xHunt

### Tracked Community
https://twitter.com/i/communities/1996098906606702626

### Narrative Post
https://x.com/i/status/2024063049645089058

## File Structure

```
/app
  /page.tsx              # Main homepage
  /admin/page.tsx        # Admin control panel
  /api
    /users/route.ts      # User management API
    /stats/route.ts      # Statistics API
    /admin/              # Admin APIs

/components
  /registration-form.tsx           # User registration
  /global-leaderboard.tsx         # Main leaderboard
  /world-map.tsx                  # Interactive map
  /country-leaderboard-modal.tsx  # Country modal

/lib
  /types.ts                   # TypeScript types
  /scoring-engine.ts          # Point calculations
  /alignment-validator.ts     # Narrative validation
  /spam-detector.ts           # Anti-spam detection
  /streak-service.ts          # Streak tracking
  /data-store.ts              # In-memory storage
  /country-stats-service.ts   # Country statistics
  /api-integration-service.ts # Future X API integration
```

## Testing the Platform

1. **Register a User**
   - Go to main page
   - Fill in registration form
   - Submit

2. **View Global Leaderboard**
   - See all users ranked by score
   - Notice levels, streaks, and alignment percentages
   - View activity breakdowns

3. **Explore World Map**
   - Colors show user density
   - Hover to see country names and counts
   - Click countries with users to see their leaderboard

4. **Access Admin Panel**
   - Click "Admin Panel" in header
   - Modify scoring values
   - Add/remove hashtags
   - Manage users
   - Export data

## Mock Data

The platform includes 20 mock users from different countries:
- USA, UK, China, France, Canada, Australia, and more
- Various activity levels and scores
- Different streak days
- Realistic engagement ratios

## Data Persistence

**Current:** In-memory storage (resets on restart)
**Future:** Easy to replace with PostgreSQL, MongoDB, etc.

## Future X API Integration

All integration functions are ready in `lib/api-integration-service.ts`:
- Fetch user posts, replies, retweets
- Get community activity
- Validate narrative alignment
- Calculate engagement scores
- Sync user data

Just implement the API calls when ready!

## Common Admin Tasks

### Change Post Points
1. Go to Admin Panel → Scoring tab
2. Adjust "Posts Scoring" values
3. Changes apply immediately

### Add New Hashtag
1. Go to Admin Panel → Narrative tab
2. Type hashtag in input (e.g., #NewHashtag)
3. Click + button

### Reset User Score
1. Go to Admin Panel → Users tab
2. Find user
3. Click reset button (circular arrow)

### Export Leaderboard
1. Go to Admin Panel → Export tab
2. Click "Export Leaderboard JSON"
3. File downloads automatically

## Tips

- **Data Refreshes:** Main page auto-refreshes every 5 seconds
- **Color Coding:** Map uses teal (low) → blue (medium) → purple (high)
- **Alignment:** Green badge = 75%+, Yellow = 50-74%, Red = <50%
- **Streaks:** Fire emojis (🔥) show active users with streaks
- **Top 3:** Special badges and borders for top 3 ranked users

## Need Help?

Check `PROJECT_DOCUMENTATION.md` for detailed technical documentation.

---

**Remember: This is a testing platform. Have fun exploring the features!**
