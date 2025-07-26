import { Post } from "../types/post";
import { db } from "../../../database/client";

// Get all posts
export async function getPosts() {
  return db
    .from("social_posts")
    .select("*")
    .order("created_at", { ascending: false });
}

// Get a single post by ID
export async function getPostById(id: string) {
  return db.from("social_posts").select("*").eq("id", id).single();
}

// Create a new post
export async function createPost(
  post: Omit<Post, "id" | "created_at" | "updated_at">
) {
  return db.from("social_posts").insert(post).select().single();
}

// Update a post
export async function updatePost(id: string, updates: Partial<Post>) {
  return db.from("social_posts").update(updates).eq("id", id).select().single();
}

// Delete a post
export async function deletePost(id: string) {
  return db.from("social_posts").delete().eq("id", id);
}
