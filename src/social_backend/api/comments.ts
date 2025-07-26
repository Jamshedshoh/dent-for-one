import { Comment } from "../types/comment";
import { db } from "../../../database/client";

// Get all comments for a post
export async function getCommentsByPost(post_id: string) {
  return db
    .from("social_comments")
    .select("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
}

// Create a new comment
export async function createComment(
  comment: Omit<Comment, "id" | "created_at">
) {
  return db.from("social_comments").insert(comment).select().single();
}

// Delete a comment
export async function deleteComment(id: string) {
  return db.from("social_comments").delete().eq("id", id);
}
