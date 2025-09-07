# ⚡ Quick Setup Checklist

## 🚀 Immediate Steps (5 minutes)

### 1. Get Credentials from Teammate

- [ ] Supabase Project URL
- [ ] Supabase Anon Key
- [ ] Access to Supabase dashboard

### 2. Create Environment File

```bash
# Create .env file in project root
echo "VITE_SUPABASE_URL=https://your-project-id.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=your-anon-key-here" >> .env
echo "VITE_GROQ_API_KEY=your-groq-api-key-here" >> .env
```

### 3. Run Database Setup

1. Go to your teammate's Supabase dashboard
2. Navigate to SQL Editor
3. Copy `database-setup.sql` content
4. Run the SQL script

### 4. Test Integration

```bash
npm run dev
# Open browser console and run:
# testBackend.runAllTests()
```

## 🔧 What We've Built

### Backend Features:

- ✅ **Enhanced Posts Table** with AI metadata
- ✅ **Engagement Tracking** (views, shares, saves, reach)
- ✅ **AI Analytics** (confidence scores, brand voice, quality metrics)
- ✅ **Hashtag Performance** tracking
- ✅ **Real-time Updates** with Supabase subscriptions
- ✅ **Row Level Security** policies

### AI Integration:

- ✅ **Professional Content Generation**
- ✅ **Smart Hashtag Suggestions**
- ✅ **Brand Voice Consistency Checker**
- ✅ **Platform-Specific Optimization**
- ✅ **Engagement Prediction**

## 🧪 Testing Your Setup

1. **Start the app**: `npm run dev`
2. **Go to Social page**
3. **Try creating a post with AI features**
4. **Check browser console for errors**
5. **Run backend tests**: `testBackend.runAllTests()`

## 🐛 Common Issues & Solutions

| Issue                  | Solution                                 |
| ---------------------- | ---------------------------------------- |
| "Invalid API key"      | Check `.env` file and restart dev server |
| "Table doesn't exist"  | Run `database-setup.sql` in Supabase     |
| "RLS policy violation" | Check authentication and policies        |
| "CORS error"           | Add localhost to Supabase CORS settings  |

## 📱 Sample Test Post

After setup, create this test post:

```json
{
  "content": "✨ Test AI-generated dental health post! #DentalHealth #Test",
  "is_generated_by_ai": true,
  "ai_prompt": "Test AI prompt",
  "ai_generation_options": {
    "tone": "professional",
    "targetAudience": "patients",
    "includeHashtags": true
  }
}
```

## 🎯 Next Steps

1. **Test basic functionality**
2. **Try AI content generation**
3. **Check engagement tracking**
4. **Verify analytics dashboard**
5. **Customize for your needs**

## 🆘 Need Help?

- Check browser console for errors
- Verify environment variables
- Ensure database schema is created
- Check Supabase project settings

