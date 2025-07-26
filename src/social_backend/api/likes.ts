import { Like } from "../types/like";
import { db } from "../../../database/client";

// Like a post
export async function likePost(like: Omit<Like, "id" | "created_at">) {
  return db.from("social_likes").insert(like).select().single();
}

// Unlike a post
export async function unlikePost(post_id: string, user_id: string) {
  return db
    .from("social_likes")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user_id);
}

// Get all likes for a post
export async function getLikesByPost(post_id: string) {
  return db.from("social_likes").select("*").eq("post_id", post_id);
}
