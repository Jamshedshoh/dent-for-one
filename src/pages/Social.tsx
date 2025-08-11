import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { groq } from "../integrations/chatbot/client";
import {
  ThumbsUp,
  MessageCircle,
  Share,
  PlusCircle,
  Edit,
  Trash2,
  Sparkles,
  Bot,
  Send,
  Image as ImageIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  subscribeToPosts,
  subscribeToLikes,
  type Post as SupabasePost,
} from "@/lib/supabase-posts";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
export default function Social() {
  const [posts, setPosts] = useState<SupabasePost[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SupabasePost | null>(null);
  const [newPost, setNewPost] = useState({
    content: "",
    image_url: "",
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const postsData = await getPosts(user?.id);
      setPosts(postsData);
      setIsLoading(false);
    };

    loadPosts();
  }, [user]);

  // Reload posts when user changes (for like status)
  useEffect(() => {
    if (user) {
      const loadPosts = async () => {
        const postsData = await getPosts(user.id);
        setPosts(postsData);
      };
      loadPosts();
    }
  }, [user]);

  // Simple polling approach for now
  useEffect(() => {
    const interval = setInterval(async () => {
      if (posts.length > 0) {
        const postsData = await getPosts(user?.id);
        setPosts(postsData);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [user?.id, posts.length]);

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const postData = {
      content: newPost.content,
      image_url: newPost.image_url || undefined,
      is_generated_by_ai: newPost.content.includes("✨"),
      ai_prompt: newPost.content.includes("✨")
        ? "AI enhanced content"
        : undefined,
    };

    const createdPost = await createPost(postData);

    if (createdPost) {
      // Add the new post to the beginning of the list immediately
      setPosts((prev) => [createdPost, ...prev]);
      setNewPost({ content: "", image_url: "" });
      setIsCreateDialogOpen(false);

      // Also refresh posts from server to ensure consistency
      setTimeout(async () => {
        const postsData = await getPosts(user?.id);
        setPosts(postsData);
      }, 1000);
    }
  };

  const handleEditPost = async () => {
    if (!editingPost || !newPost.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const postData = {
      content: newPost.content,
      image_url: newPost.image_url || undefined,
      is_generated_by_ai: newPost.content.includes("✨"),
      ai_prompt: newPost.content.includes("✨")
        ? "AI enhanced content"
        : undefined,
    };

    const updatedPost = await updatePost(editingPost.id, postData);

    if (updatedPost) {
      setEditingPost(null);
      setNewPost({ content: "", image_url: "" });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    const success = await deletePost(postId);
    if (success) {
      // Remove the post from local state immediately
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  const handleLikePost = async (postId: string) => {
    const success = await toggleLike(postId);
    if (success) {
      // Update like status immediately
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: post.is_liked
                ? post.likes_count - 1
                : post.likes_count + 1,
              is_liked: !post.is_liked,
            };
          }
          return post;
        })
      );
    }
  };

  const handleUseAIToFix = async () => {
    if (!newPost.content.trim()) {
      toast.error("Please enter some content first");
      return;
    }

    setIsGeneratingAI(true);
    toast.info("AI is improving your content...");
    console.log("Using AI to improve post:", newPost.content);
    try {
      const chatCompletion = await getGroqChatCompletion();
      // Print the completion returned by the LLM.
      console.log(chatCompletion.choices[0]?.message?.content || "");
      // const aiPrompt = `Improve this dental health post: "${newPost.content}"`;
      // const improvedContent = `✨ ${newPost.content}\n\n💡 Pro tip: Remember to maintain consistent oral hygiene habits for the best results! Your dental health journey is worth celebrating! 🦷`;

      // setNewPost({
      //   ...newPost,
      //   content: improvedContent,
      // });

      setNewPost({
        ...newPost,
        content: `✨ ${chatCompletion.choices[0]?.message?.content}`,
      });
      async function getGroqChatCompletion() {
        return groq.chat.completions.create({
          messages: [
            // {
            //   role: "user",
            //   content: "Explain the importance of fast language models",
            // },
            {
              role: "system",
              content:
                "You are a helpful dental health assistant. Improve the following post about dental health, making it more engaging and informative while maintaining the original intent. Add relevant emojis and format it nicely. Prefix with a sparkle emoji (✨) to indicate AI enhancement.",
            },
            { role: "user", content: newPost.content },
          ],
          model: "llama-3.3-70b-versatile",
        });
      }

      toast.success("AI has improved your content!");
    } catch (error) {
      console.error("Error improving post:", error);
      toast.error("Failed to generate AI content. Using fallback.");

      // setNewPost({
      //   ...newPost,
      //   content: `✨ ${newPost.content}\n\n💡 Pro tip: Remember to maintain consistent oral hygiene habits for the best results! Your dental health journey is worth celebrating! 🦷`,
      // });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const openEditDialog = (post: SupabasePost) => {
    setEditingPost(post);
    setNewPost({
      content: post.content,
      image_url: post.image_url || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSharePost = (post: SupabasePost, platform: string) => {
    const postContent = post.content;
    const postUrl = `${window.location.origin}/social/post/${post.id}`;
    const hashtags = "#DentalHealth #OralCare #DentForOne";

    let shareUrl = "";
    let shareText = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}&quote=${encodeURIComponent(postContent)}`;
        break;
      case "twitter":
        shareText = `${postContent} ${hashtags}`;
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(postUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          postUrl
        )}&title=${encodeURIComponent(
          "Dental Health Post"
        )}&summary=${encodeURIComponent(postContent)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we'll copy the content
        shareText = `${postContent}\n\n${hashtags}\n\n${postUrl}`;
        navigator.clipboard.writeText(shareText);
        toast.success("Content copied! You can now paste it on Instagram");
        return;
      case "copy":
        shareText = `${postContent}\n\n${hashtags}\n\n${postUrl}`;
        navigator.clipboard.writeText(shareText);
        toast.success("Post content copied to clipboard!");
        return;
      default:
        return;
    }

    // Open sharing URL in new window
    window.open(shareUrl, "_blank", "width=600,height=400");
    toast.success(
      `Sharing on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Social Share" />

      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Share Your Dental Journey</h2>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your dental health journey with the community
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Textarea
                    placeholder="What's on your mind about dental health?"
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUseAIToFix}
                      disabled={isGeneratingAI || !newPost.content.trim()}
                      className="flex items-center gap-2"
                    >
                      <Sparkles size={14} />
                      {isGeneratingAI ? "Generating..." : "Use AI to fix"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <ImageIcon size={14} />
                      Add Image
                    </Button>
                  </div>
                  {newPost.content.includes("✨") && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Bot size={12} />
                      <span>Generated by AI</span>
                      <Badge variant="secondary" className="text-xs">
                        AI Enhanced
                      </Badge>
                    </div>
                  )}
                </div>
                <Input
                  placeholder="Image URL (optional)"
                  value={newPost.image_url}
                  onChange={(e) =>
                    setNewPost({ ...newPost, image_url: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreatePost}>Create Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No posts yet. Be the first to share!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card rounded-xl shadow-sm overflow-hidden animate-fade-in"
                  style={{
                    animationDelay: `${parseInt(post.id.slice(0, 8)) * 100}ms`,
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <img
                          src={
                            post.user_avatar ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop"
                          }
                          alt={post.user_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium text-sm">
                            {post.user_name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {formatTimeAgo(post.created_at)}
                          </p>
                        </div>
                      </div>
                      {user && post.user_id === user.id && (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(post)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      )}
                    </div>

                    {post.is_generated_by_ai && (
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <Bot size={12} />
                        <span>Generated by AI</span>
                        {post.ai_prompt && (
                          <Badge variant="secondary" className="text-xs">
                            Prompt: "{post.ai_prompt}"
                          </Badge>
                        )}
                      </div>
                    )}

                    <p className="text-sm mb-3">{post.content}</p>

                    {post.image_url && (
                      <div
                        className="h-48 bg-cover bg-center rounded-lg mb-3"
                        style={{ backgroundImage: `url(${post.image_url})` }}
                      />
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-4">
                        <button
                          className={`flex items-center text-xs ${
                            post.is_liked
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp size={14} className="mr-1" />
                          {post.likes_count}
                        </button>
                        <button className="flex items-center text-xs text-muted-foreground">
                          <MessageCircle size={14} className="mr-1" />
                          {post.comments_count}
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center text-xs text-muted-foreground">
                              <Share size={14} className="mr-1" />
                              Share
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleSharePost(post, "facebook")}
                            >
                              <Facebook size={14} className="mr-2" />
                              Share on Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSharePost(post, "twitter")}
                            >
                              <Twitter size={14} className="mr-2" />
                              Share on Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSharePost(post, "linkedin")}
                            >
                              <Linkedin size={14} className="mr-2" />
                              Share on LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSharePost(post, "instagram")}
                            >
                              <Instagram size={14} className="mr-2" />
                              Copy for Instagram
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSharePost(post, "copy")}
                            >
                              <Copy size={14} className="mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Update your post content</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Textarea
                placeholder="What's on your mind about dental health?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUseAIToFix}
                  disabled={isGeneratingAI || !newPost.content.trim()}
                  className="flex items-center gap-2"
                >
                  <Sparkles size={14} />
                  {isGeneratingAI ? "Generating..." : "Use AI to fix"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ImageIcon size={14} />
                  Add Image
                </Button>
              </div>
            </div>
            <Input
              placeholder="Image URL (optional)"
              value={newPost.image_url}
              onChange={(e) =>
                setNewPost({ ...newPost, image_url: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditPost}>Update Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
}
