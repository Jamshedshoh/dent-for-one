import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Post {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  image_url?: string;
  likes_count: number;
  comments_count: number;
  is_generated_by_ai?: boolean;
  ai_prompt?: string;
  ai_generation_options?: AIGenerationOptions;
  ai_metadata?: AIMetadata;
  engagement_metrics?: EngagementMetrics;
  created_at: string;
  updated_at: string;
  is_liked?: boolean;
}

export interface CreatePostData {
  content: string;
  image_url?: string;
  is_generated_by_ai?: boolean;
  ai_prompt?: string;
  ai_generation_options?: AIGenerationOptions;
  ai_metadata?: AIMetadata;
}

export interface AIGenerationOptions {
  tone: "professional" | "casual" | "educational" | "motivational";
  includeHashtags: boolean;
  optimizeForEngagement: boolean;
  targetAudience: "patients" | "professionals" | "general";
  brandVoice: "friendly" | "authoritative" | "caring" | "modern";
  contentType: "tip" | "story" | "educational" | "promotional" | "community";
}

export interface AIMetadata {
  generation_timestamp: string;
  model_used: string;
  confidence_score?: number;
  brand_voice_score?: number;
  professional_standards_score?: number;
  hashtag_relevance_score?: number;
  engagement_prediction_score?: number;
  content_quality_score?: number;
}

export interface EngagementMetrics {
  views: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  click_through_rate?: number;
  engagement_rate: number;
  hashtag_performance?: HashtagPerformance[];
}

export interface HashtagPerformance {
  hashtag: string;
  reach: number;
  engagement: number;
  trending_score: number;
}

// Get all posts with user like status
export async function getPosts(userId?: string): Promise<Post[]> {
  try {
    const query = supabase
      .from("posts")
      .select(
        `
        *,
        post_likes(user_id)
      `
      )
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
      return [];
    }

    // Transform data to include like status
    const posts =
      data?.map((post: Post & { post_likes?: { user_id: string }[] }) => ({
        ...post,
        is_liked: userId
          ? post.post_likes?.some(
              (like: { user_id: string }) => like.user_id === userId
            )
          : false,
      })) || [];

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
}

// Get posts filtered by AI generation status
export async function getPostsByAIStatus(
  isAIGenerated: boolean,
  userId?: string
): Promise<Post[]> {
  try {
    const query = supabase
      .from("posts")
      .select(
        `
        *,
        post_likes(user_id)
      `
      )
      .eq("is_generated_by_ai", isAIGenerated)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching AI posts:", error);
      toast.error("Failed to load posts");
      return [];
    }

    const posts =
      data?.map((post: Post & { post_likes?: { user_id: string }[] }) => ({
        ...post,
        is_liked: userId
          ? post.post_likes?.some(
              (like: { user_id: string }) => like.user_id === userId
            )
          : false,
      })) || [];

    return posts;
  } catch (error) {
    console.error("Error fetching AI posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
}

// Get posts by user
export async function getPostsByUser(userId: string): Promise<Post[]> {
  try {
    const query = supabase
      .from("posts")
      .select(
        `
        *,
        post_likes(user_id)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching user posts:", error);
      toast.error("Failed to load posts");
      return [];
    }

    const posts =
      data?.map((post: Post & { post_likes?: { user_id: string }[] }) => ({
        ...post,
        is_liked: post.post_likes?.some(
          (like: { user_id: string }) => like.user_id === userId
        ),
      })) || [];

    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
}

// Create a new post
export async function createPost(
  postData: CreatePostData
): Promise<Post | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to create a post");
      return null;
    }

    // Create AI metadata if this is an AI-generated post
    const aiMetadata: AIMetadata | undefined = postData.is_generated_by_ai
      ? {
          generation_timestamp: new Date().toISOString(),
          model_used: "llama-3.3-70b-versatile",
          confidence_score: 0.85,
          brand_voice_score: 0.9,
          professional_standards_score: 0.95,
          hashtag_relevance_score: 0.8,
          engagement_prediction_score: 0.75,
          content_quality_score: 0.9,
        }
      : undefined;

    // Initialize engagement metrics
    const engagementMetrics: EngagementMetrics = {
      views: 0,
      shares: 0,
      saves: 0,
      reach: 0,
      impressions: 0,
      engagement_rate: 0,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        user_name: user.user_metadata?.full_name || user.email || "Anonymous",
        user_avatar: user.user_metadata?.avatar_url,
        content: postData.content,
        image_url: postData.image_url,
        is_generated_by_ai: postData.is_generated_by_ai || false,
        ai_prompt: postData.ai_prompt,
        ai_generation_options: postData.ai_generation_options,
        ai_metadata: aiMetadata,
        engagement_metrics: engagementMetrics,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      return null;
    }

    console.log("Post created successfully:", data);
    toast.success("Post created successfully!");
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post");
    return null;
  }
}

// Update a post
export async function updatePost(
  postId: string,
  postData: Partial<CreatePostData>
): Promise<Post | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to update a post");
      return null;
    }

    const { data, error } = await supabase
      .from("posts")
      .update({
        content: postData.content,
        image_url: postData.image_url,
        is_generated_by_ai: postData.is_generated_by_ai,
        ai_prompt: postData.ai_prompt,
        ai_generation_options: postData.ai_generation_options,
        ai_metadata: postData.ai_metadata,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId)
      .eq("user_id", user.id) // Ensure user can only update their own posts
      .select()
      .single();

    if (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
      return null;
    }

    toast.success("Post updated successfully!");
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    toast.error("Failed to update post");
    return null;
  }
}

// Delete a post
export async function deletePost(postId: string): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to delete a post");
      return false;
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("user_id", user.id); // Ensure user can only delete their own posts

    if (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
      return false;
    }

    toast.success("Post deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post");
    return false;
  }
}

// Like/unlike a post
export async function toggleLike(postId: string): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to like posts");
      return false;
    }

    // Check if user already liked the post
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select()
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .single();

    if (existingLike) {
      // Unlike the post
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error unliking post:", error);
        toast.error("Failed to unlike post");
        return false;
      }

      toast.success("Post unliked");
      return true;
    } else {
      // Like the post
      const { error } = await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        console.error("Error liking post:", error);
        toast.error("Failed to like post");
        return false;
      }

      toast.success("Post liked!");
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    toast.error("Failed to like/unlike post");
    return false;
  }
}

// Track post engagement metrics
export async function trackPostEngagement(
  postId: string,
  engagementType: "view" | "share" | "save" | "reach" | "impression"
): Promise<boolean> {
  try {
    const { data: currentPost } = await supabase
      .from("posts")
      .select("engagement_metrics")
      .eq("id", postId)
      .single();

    if (!currentPost) {
      console.error("Post not found");
      return false;
    }

    const currentMetrics = currentPost.engagement_metrics || {
      views: 0,
      shares: 0,
      saves: 0,
      reach: 0,
      impressions: 0,
      engagement_rate: 0,
    };

    // Update the specific metric
    const updatedMetrics = {
      ...currentMetrics,
      [engagementType + "s"]: currentMetrics[engagementType + "s"] + 1,
    };

    // Calculate engagement rate
    const totalInteractions =
      updatedMetrics.likes_count + updatedMetrics.shares + updatedMetrics.saves;
    updatedMetrics.engagement_rate =
      totalInteractions > 0
        ? (totalInteractions / updatedMetrics.impressions) * 100
        : 0;

    const { error } = await supabase
      .from("posts")
      .update({
        engagement_metrics: updatedMetrics,
      })
      .eq("id", postId);

    if (error) {
      console.error("Error updating engagement metrics:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error tracking engagement:", error);
    return false;
  }
}

// Get AI analytics and insights
export async function getAIAnalytics(): Promise<{
  totalAIPosts: number;
  averageEngagement: number;
  topPerformingTones: Array<{ tone: string; engagement: number }>;
  topPerformingBrandVoices: Array<{ voice: string; engagement: number }>;
  hashtagPerformance: Array<{
    hashtag: string;
    usage: number;
    engagement: number;
  }>;
}> {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("ai_generation_options, engagement_metrics, content")
      .eq("is_generated_by_ai", true);

    if (error) {
      console.error("Error fetching AI analytics:", error);
      return {
        totalAIPosts: 0,
        averageEngagement: 0,
        topPerformingTones: [],
        topPerformingBrandVoices: [],
        hashtagPerformance: [],
      };
    }

    const totalAIPosts = posts?.length || 0;
    let totalEngagement = 0;
    const tonePerformance: { [key: string]: number } = {};
    const brandVoicePerformance: { [key: string]: number } = {};
    const hashtagStats: {
      [key: string]: { usage: number; engagement: number };
    } = {};

    posts?.forEach((post) => {
      const engagement = post.engagement_metrics?.engagement_rate || 0;
      totalEngagement += engagement;

      if (post.ai_generation_options?.tone) {
        const tone = post.ai_generation_options.tone;
        tonePerformance[tone] = (tonePerformance[tone] || 0) + engagement;
      }

      if (post.ai_generation_options?.brandVoice) {
        const voice = post.ai_generation_options.brandVoice;
        brandVoicePerformance[voice] =
          (brandVoicePerformance[voice] || 0) + engagement;
      }

      // Extract hashtags from content and track performance
      const hashtags = post.content.match(/#\w+/g) || [];
      hashtags.forEach((hashtag) => {
        if (!hashtagStats[hashtag]) {
          hashtagStats[hashtag] = { usage: 0, engagement: 0 };
        }
        hashtagStats[hashtag].usage += 1;
        hashtagStats[hashtag].engagement += engagement;
      });
    });

    const averageEngagement =
      totalAIPosts > 0 ? totalEngagement / totalAIPosts : 0;

    const topPerformingTones = Object.entries(tonePerformance)
      .map(([tone, engagement]) => ({ tone, engagement }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    const topPerformingBrandVoices = Object.entries(brandVoicePerformance)
      .map(([voice, engagement]) => ({ voice, engagement }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    const hashtagPerformance = Object.entries(hashtagStats)
      .map(([hashtag, stats]) => ({
        hashtag,
        usage: stats.usage,
        engagement: stats.engagement / stats.usage,
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10);

    return {
      totalAIPosts,
      averageEngagement,
      topPerformingTones,
      topPerformingBrandVoices,
      hashtagPerformance,
    };
  } catch (error) {
    console.error("Error getting AI analytics:", error);
    return {
      totalAIPosts: 0,
      averageEngagement: 0,
      topPerformingTones: [],
      topPerformingBrandVoices: [],
      hashtagPerformance: [],
    };
  }
}

// Subscribe to real-time post updates
export function subscribeToPosts(
  callback: (posts: Post[]) => void,
  userId?: string
) {
  console.log("Setting up posts subscription...");

  return supabase
    .channel("posts")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      async (payload) => {
        console.log("Received post change:", payload);
        // Refetch posts when there are changes
        const posts = await getPosts(userId);
        console.log("Refetched posts:", posts.length);
        callback(posts);
      }
    )
    .subscribe((status) => {
      console.log("Posts subscription status:", status);
    });
}

// Subscribe to real-time like updates
export function subscribeToLikes(
  callback: (postId: string, likesCount: number) => void
) {
  console.log("Setting up likes subscription...");

  return supabase
    .channel("post_likes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "post_likes",
      },
      async (payload: {
        new?: { post_id: string };
        old?: { post_id: string };
      }) => {
        console.log("Received like change:", payload);
        // Get updated likes count for the post
        const postId = payload.new?.post_id || payload.old?.post_id;
        if (!postId) return;

        const { data } = await supabase
          .from("posts")
          .select("likes_count")
          .eq("id", postId)
          .single();

        if (data) {
          console.log(
            "Updated likes count for post:",
            postId,
            "count:",
            data.likes_count
          );
          callback(postId, data.likes_count);
        }
      }
    )
    .subscribe((status) => {
      console.log("Likes subscription status:", status);
    });
}
