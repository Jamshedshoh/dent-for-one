import * as api from "../api/posts";

import { Post } from "../types/post";

export async function fetchPosts() {
  return api.getPosts();
}

export async function fetchPostById(id: string) {
  return api.getPostById(id);
}

export async function addPost(
  post: Omit<Post, "id" | "created_at" | "updated_at">
) {
  return api.createPost(post);
}

export async function editPost(id: string, updates: Partial<Post>) {
  return api.updatePost(id, updates);
}

export async function removePost(id: string) {
  return api.deletePost(id);
}
