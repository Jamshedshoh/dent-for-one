-- Social Media Content Hub Schema (Supabase compatible)

-- Social Posts
drop table if exists social_posts cascade;
create table if not exists social_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  content text not null,
  media_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_published boolean default true
);

-- Comments
drop table if exists social_comments cascade;
create table if not exists social_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references social_posts on delete cascade,
  user_id uuid references auth.users,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Likes
drop table if exists social_likes cascade;
create table if not exists social_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references social_posts on delete cascade,
  user_id uuid references auth.users,
  created_at timestamp with time zone default now(),
  unique (post_id, user_id)
);

-- Scheduled Posts
drop table if exists social_schedules cascade;
create table if not exists social_schedules (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references social_posts on delete cascade,
  scheduled_for timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

-- Analytics (simple event log)
drop table if exists social_analytics cascade;
create table if not exists social_analytics (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references social_posts on delete cascade,
  user_id uuid references auth.users,
  event_type text, -- e.g. 'view', 'like', 'comment'
  created_at timestamp with time zone default now()
);