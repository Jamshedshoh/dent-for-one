-- Enhanced database schema for Dent App Social Share with AI integration
-- This includes all the new AI features, engagement tracking, and analytics

-- Create posts table for social sharing with enhanced AI capabilities
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_generated_by_ai BOOLEAN DEFAULT FALSE,
  ai_prompt TEXT,
  ai_generation_options JSONB, -- Store AI configuration options
  ai_metadata JSONB, -- Store AI generation metadata and scores
  engagement_metrics JSONB DEFAULT '{"views": 0, "shares": 0, "saves": 0, "reach": 0, "impressions": 0, "engagement_rate": 0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create likes table for tracking user likes
CREATE TABLE post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Create comments table
CREATE TABLE post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create engagement tracking table for detailed analytics
CREATE TABLE post_engagement (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('view', 'share', 'save', 'reach', 'impression')),
  platform TEXT, -- Track which platform the engagement came from
  metadata JSONB, -- Additional engagement data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI analytics table for performance tracking
CREATE TABLE ai_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  generation_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  model_used TEXT NOT NULL,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  brand_voice_score DECIMAL(3,2) CHECK (brand_voice_score >= 0 AND brand_voice_score <= 1),
  professional_standards_score DECIMAL(3,2) CHECK (professional_standards_score >= 0 AND professional_standards_score <= 1),
  hashtag_relevance_score DECIMAL(3,2) CHECK (hashtag_relevance_score >= 0 AND hashtag_relevance_score <= 1),
  engagement_prediction_score DECIMAL(3,2) CHECK (engagement_prediction_score >= 0 AND engagement_prediction_score <= 1),
  content_quality_score DECIMAL(3,2) CHECK (content_quality_score >= 0 AND content_quality_score <= 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hashtag performance tracking table
CREATE TABLE hashtag_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hashtag TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  usage_count INTEGER DEFAULT 1,
  reach_count INTEGER DEFAULT 0,
  engagement_count INTEGER DEFAULT 0,
  trending_score DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_performance ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Posts: Anyone can read, authenticated users can create/update/delete their own
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Likes: Anyone can read, authenticated users can create/delete their own
CREATE POLICY "Likes are viewable by everyone" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes" ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Comments: Anyone can read, authenticated users can create/update/delete their own
CREATE POLICY "Comments are viewable by everyone" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments" ON post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON post_comments FOR DELETE USING (auth.uid() = user_id);

-- Engagement: Anyone can read, authenticated users can create their own
CREATE POLICY "Engagement is viewable by everyone" ON post_engagement FOR SELECT USING (true);
CREATE POLICY "Users can insert their own engagement" ON post_engagement FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI Analytics: Anyone can read, authenticated users can create their own
CREATE POLICY "AI Analytics are viewable by everyone" ON ai_analytics FOR SELECT USING (true);
CREATE POLICY "Users can insert their own AI analytics" ON ai_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Hashtag Performance: Anyone can read, authenticated users can create their own
CREATE POLICY "Hashtag Performance is viewable by everyone" ON hashtag_performance FOR SELECT USING (true);
CREATE POLICY "Users can insert their own hashtag performance" ON hashtag_performance FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for updating counts
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update engagement metrics
CREATE OR REPLACE FUNCTION update_post_engagement_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update the engagement metrics in the posts table
    UPDATE posts
    SET engagement_metrics = jsonb_set(
      COALESCE(engagement_metrics, '{"views": 0, "shares": 0, "saves": 0, "reach": 0, "impressions": 0, "engagement_rate": 0}'::jsonb),
      '{' || NEW.engagement_type || 's}',
      to_jsonb((COALESCE(engagement_metrics->>(NEW.engagement_type || 's'), '0')::integer + 1)::text)
    )
    WHERE id = NEW.post_id;

    -- Recalculate engagement rate
    UPDATE posts
    SET engagement_metrics = jsonb_set(
      engagement_metrics,
      '{engagement_rate}',
      to_jsonb(
        CASE
          WHEN (engagement_metrics->>'impressions')::integer > 0
          THEN ((engagement_metrics->>'likes_count')::integer + (engagement_metrics->>'shares')::integer + (engagement_metrics->>'saves')::integer)::float / (engagement_metrics->>'impressions')::integer * 100
          ELSE 0
        END
      )
    )
    WHERE id = NEW.post_id;

    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to extract and track hashtags
CREATE OR REPLACE FUNCTION extract_and_track_hashtags()
RETURNS TRIGGER AS $$
DECLARE
  hashtag TEXT;
  hashtag_pattern TEXT := '#[a-zA-Z0-9_]+';
BEGIN
  -- Extract hashtags from content using regex
  FOR hashtag IN
    SELECT regexp_matches(NEW.content, hashtag_pattern, 'g')
  LOOP
    -- Insert or update hashtag performance
    INSERT INTO hashtag_performance (hashtag, post_id, usage_count)
    VALUES (hashtag, NEW.id, 1)
    ON CONFLICT (hashtag, post_id)
    DO UPDATE SET
      usage_count = hashtag_performance.usage_count + 1,
      updated_at = NOW();
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_post_likes_count_trigger
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

CREATE TRIGGER update_post_comments_count_trigger
  AFTER INSERT OR DELETE ON post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

CREATE TRIGGER update_post_engagement_metrics_trigger
  AFTER INSERT ON post_engagement
  FOR EACH ROW EXECUTE FUNCTION update_post_engagement_metrics();

CREATE TRIGGER extract_hashtags_trigger
  AFTER INSERT ON posts
  FOR EACH ROW EXECUTE FUNCTION extract_and_track_hashtags();

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);
CREATE INDEX idx_posts_is_generated_by_ai ON posts(is_generated_by_ai);
CREATE INDEX idx_posts_ai_generation_options ON posts USING GIN(ai_generation_options);
CREATE INDEX idx_posts_ai_metadata ON posts USING GIN(ai_metadata);
CREATE INDEX idx_posts_engagement_metrics ON posts USING GIN(engagement_metrics);

CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);

CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_post_comments_user_id ON post_comments(user_id);

CREATE INDEX idx_post_engagement_post_id ON post_engagement(post_id);
CREATE INDEX idx_post_engagement_type ON post_engagement(engagement_type);
CREATE INDEX idx_post_engagement_created_at ON post_engagement(created_at);

CREATE INDEX idx_ai_analytics_post_id ON ai_analytics(post_id);
CREATE INDEX idx_ai_analytics_created_at ON ai_analytics(created_at);

CREATE INDEX idx_hashtag_performance_hashtag ON hashtag_performance(hashtag);
CREATE INDEX idx_hashtag_performance_post_id ON hashtag_performance(post_id);
CREATE INDEX idx_hashtag_performance_trending_score ON hashtag_performance(trending_score);

-- Insert sample data for testing (optional)
-- INSERT INTO posts (user_id, user_name, content, is_generated_by_ai, ai_prompt)
-- VALUES ('00000000-0000-0000-0000-000000000000', 'Test User', 'This is a test post about dental health! #DentalHealth #OralCare', true, 'Test AI prompt');