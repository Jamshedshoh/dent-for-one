# Social Media Content Hub Backend (Supabase)

This module provides the backend schema for the Social Media Content Hub section of your app, using your existing Supabase project.

## Setup Instructions

1. **Open your Supabase project dashboard.**
2. **Go to the SQL Editor.**
3. **Copy and paste the contents of `social_hub_schema.sql` into the SQL editor and run it.**
   - This will create the necessary tables for posts, comments, likes, schedules, and analytics.

## Table Overview

- **social_posts**: Stores user-generated posts (text, media, published status).
- **social_comments**: Stores comments on posts.
- **social_likes**: Tracks which users have liked which posts.
- **social_schedules**: Stores scheduled posts for future publishing.
- **social_analytics**: Logs engagement events (views, likes, comments, etc.).

## Usage with Supabase Client

You can use the existing Supabase client (`db` from `database/client.ts`) to interact with these tables. Example:

```js
// Fetch all published posts
const { data, error } = await db
  .from("social_posts")
  .select("*")
  .eq("is_published", true);

// Create a new post
const { data, error } = await db
  .from("social_posts")
  .insert({ user_id, content, media_url });

// Like a post
const { data, error } = await db
  .from("social_likes")
  .insert({ post_id, user_id });
```

## Next Steps

- Set up Row Level Security (RLS) policies in Supabase to restrict access to user-owned data.
- Optionally, create Supabase Edge Functions for advanced logic (e.g., notifications, moderation).
- Integrate these endpoints with your frontend Social Share components.

---

For more details or to extend the backend, see the comments in `social_hub_schema.sql`.
