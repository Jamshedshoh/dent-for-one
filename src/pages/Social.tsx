import {
  Bot,
  Copy,
  Edit,
  ExternalLink,
  Facebook,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  MessageCircle,
  PlusCircle,
  Send,
  Share,
  Sparkles,
  ThumbsUp,
  Trash2,
  Twitter,
} from "lucide-react";
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
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  image?: string;
  isGeneratedByAI?: boolean;
  aiPrompt?: string;
  isLiked?: boolean;
}

export default function Social() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Just completed my 30-day flossing challenge! 🦷 My dentist was so impressed with the improvement.",
      likes: 24,
      comments: 5,
      timeAgo: "2h ago",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2340&auto=format&fit=crop",
    },
    {
      id: "2",
      user: {
        name: "Dr. Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Tip of the day: Replace your toothbrush every 3 months for best results. Your gums will thank you!",
      likes: 56,
      comments: 8,
      timeAgo: "5h ago",
    },
    {
      id: "3",
      user: {
        name: "Jessica Miller",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop",
      },
      content:
        "Completed my teeth whitening treatment! Check out the before and after. So happy with the results! 😁",
      likes: 112,
      comments: 23,
      timeAgo: "1d ago",
      image:
        "https://images.unsplash.com/photo-1581671504312-2d7b55962d57?q=80&w=2340&auto=format&fit=crop",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop",
      },
      content: newPost.content,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
      image: newPost.image || undefined,
    };

    setPosts([post, ...posts]);
    setNewPost({ content: "", image: "" });
    setIsCreateDialogOpen(false);
    toast.success("Post created successfully!");
  };

  const handleEditPost = () => {
    if (!editingPost || !newPost.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,
              content: newPost.content,
              image: newPost.image || undefined,
            }
          : post
      )
    );

    setEditingPost(null);
    setNewPost({ content: "", image: "" });
    setIsEditDialogOpen(false);
    toast.success("Post updated successfully!");
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
    toast.success("Post deleted successfully!");
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleUseAIToFix = async () => {
    if (!newPost.content.trim()) {
      toast.error("Please enter some content first");
      return;
    }

    setIsGeneratingAI(true);

    // Simulate AI content generation
    setTimeout(() => {
      const aiPrompt = `Improve this dental health post: "${newPost.content}"`;
      const improvedContent = `✨ ${newPost.content}\n\n💡 Pro tip: Remember to maintain consistent oral hygiene habits for the best results! Your dental health journey is worth celebrating! 🦷`;

      setNewPost({
        ...newPost,
        content: improvedContent,
      });

      setIsGeneratingAI(false);
      toast.success("AI has improved your content!");
    }, 2000);
  };

  const handleSharePost = (post: Post, platform: string) => {
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

  const openEditDialog = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      content: post.content,
      image: post.image || "",
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Social Share" />

      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Share Your Dental Journey</h2>
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
                  value={newPost.image}
                  onChange={(e) =>
                    setNewPost({ ...newPost, image: e.target.value })
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

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-card rounded-xl shadow-sm overflow-hidden animate-fade-in"
              style={{ animationDelay: `${parseInt(post.id) * 100}ms` }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">{post.user.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {post.timeAgo}
                      </p>
                    </div>
                  </div>
                  {post.user.name === "You" && (
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

                {post.isGeneratedByAI && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    <Bot size={12} />
                    <span>Generated by AI</span>
                    {post.aiPrompt && (
                      <Badge variant="secondary" className="text-xs">
                        Prompt: "{post.aiPrompt}"
                      </Badge>
                    )}
                  </div>
                )}

                <p className="text-sm mb-3">{post.content}</p>

                {post.image && (
                  <div
                    className="h-48 bg-cover bg-center rounded-lg mb-3"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button
                      className={`flex items-center text-xs ${
                        post.isLiked ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => handleLikePost(post.id)}
                    >
                      <ThumbsUp size={14} className="mr-1" />
                      {post.likes}
                    </button>
                    <button className="flex items-center text-xs text-muted-foreground">
                      <MessageCircle size={14} className="mr-1" />
                      {post.comments}
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
          ))}
        </div>
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
              value={newPost.image}
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.value })
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
