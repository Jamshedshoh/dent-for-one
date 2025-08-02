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
  created_at: string;
  updated_at: string;
  is_liked?: boolean;
}

export interface CreatePostData {
  content: string;
  image_url?: string;
  is_generated_by_ai?: boolean;
  ai_prompt?: string;
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
