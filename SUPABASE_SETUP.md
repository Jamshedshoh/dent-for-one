# 🚀 Supabase Backend Integration Guide

## 📋 Prerequisites

1. **Access to your teammate's Supabase project**
2. **Supabase project URL and anon key**
3. **Groq API key** (for AI features)

## 🔧 Step 1: Get Supabase Credentials

Ask your teammate to provide:

- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: Public key from Supabase dashboard
- **Service Role Key**: (Optional, for admin operations)

## 🔑 Step 2: Set Environment Variables

Create a `.env` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Groq AI Configuration
VITE_GROQ_API_KEY=your-groq-api-key-here

# Optional: OpenAI for additional AI features
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

## 🗄️ Step 3: Set Up Database Schema

1. **Go to your teammate's Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `database-setup.sql`**
4. **Run the SQL script**

## 🔐 Step 4: Configure Authentication

1. **Go to Authentication > Settings in Supabase**
2. **Enable Email/Password authentication**
3. **Configure your site URL** (e.g., `http://localhost:5173` for development)
4. **Add redirect URLs** for your app

## 🧪 Step 5: Test the Integration

1. **Start your development server**: `npm run dev`
2. **Navigate to the Social page**
3. **Try creating a post with AI features**
4. **Check the browser console for any errors**

## 📊 Step 6: Verify Database Tables

Check that these tables were created:

- `posts` (with AI fields)
- `post_likes`
- `post_comments`
- `post_engagement`
- `ai_analytics`
- `hashtag_performance`

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**

   - Check your `.env` file
   - Verify the anon key is correct

2. **"Table doesn't exist" error**

   - Run the database setup SQL script
   - Check table names match exactly

3. **"RLS policy violation" error**

   - Ensure Row Level Security policies are created
   - Check user authentication status

4. **"CORS error"**
   - Add your localhost URL to Supabase CORS settings
   - Check authentication redirect URLs

## 🔍 Testing Checklist

- [ ] Environment variables are set
- [ ] Database schema is created
- [ ] Authentication is configured
- [ ] Can create posts
- [ ] AI features work
- [ ] Engagement tracking works
- [ ] Analytics dashboard displays data

## 📱 Sample Test Data

After setup, you can test with sample posts:

```sql
-- Insert a test AI-generated post
INSERT INTO posts (
  user_id,
  user_name,
  content,
  is_generated_by_ai,
  ai_prompt,
  ai_generation_options,
  ai_metadata
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Test User',
  '✨ Maintaining good oral hygiene is crucial for overall health! Remember to brush twice daily and floss regularly. #DentalHealth #OralCare #HealthySmile',
  true,
  'AI enhanced content',
  '{"tone": "professional", "targetAudience": "patients", "includeHashtags": true}',
  '{"confidence_score": 0.9, "brand_voice_score": 0.85, "content_quality_score": 0.9}'
);
```

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Verify all environment variables are set
3. Ensure database schema is properly created
4. Check Supabase project settings and policies

