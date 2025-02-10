import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { db } from "../../database/client";
import { useAuth } from "./AuthContext";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string; // draft, published, archived
  published_at: string | null;
  author_id: string;
}

interface BlogContextType {
  posts: BlogPost[];
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<BlogPost | null>;
  createPost: (post: Partial<BlogPost>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  publishPost: (id: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    const { data, error } = await db.from("blog_posts").select("*");
    if (error) throw error;
    setPosts(data || []);
  }, []);

  const fetchPost = useCallback(async (id: string) => {
    const { data, error } = await db.from("blog_posts").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  }, []);

  const createPost = async (post: Partial<BlogPost>) => {
    if (!user) throw new Error("User not authenticated");
    
    const postData = {
      ...post,
      status: "draft",
      author_id: user.id
    };

    const { data, error } = await db.from("blog_posts").insert(postData).single();
    if (error) throw error;
    setPosts((prev) => [...prev, data as BlogPost]);
  };

  const updatePost = async (id: string, post: Partial<BlogPost>) => {
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await db
      .from("blog_posts")
      .update(post)
      .eq("id", id)
      .eq("author_id", user.id)
      .single();
    if (error) throw error;
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...(data as BlogPost) } : p)));
  };

  const deletePost = async (id: string) => {
    const { error } = await db.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const publishPost = async (id: string) => {
    const { data, error } = await db
      .from("blog_posts")
      .update({ published_at: new Date().toISOString() })
      .eq("id", id)
      .eq("author_id", user?.id)
      .single();
    if (error) throw error;
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...(data as BlogPost) } : p)));
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <BlogContext.Provider
      value={{ posts, fetchPosts, fetchPost, createPost, updatePost, deletePost, publishPost }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlog must be used within a BlogProvider");
  return context;
};
