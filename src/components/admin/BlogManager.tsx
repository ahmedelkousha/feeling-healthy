"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, X, BookOpen, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogItem, addBlog, updateBlog, deleteBlog } from "@/lib/firebase/services";
import { toast } from "sonner";
import Link from "next/link";

interface BlogManagerProps {
  blogs: BlogItem[];
  loading?: boolean;
  onRefresh: () => void;
}

export function BlogManager({ blogs, loading, onRefresh }: BlogManagerProps) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Mind & Emotional Wellbeing");
  const [readingTime, setReadingTime] = useState("4 min read");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("/images/service-hypnosis.jpg");
  const [bodyText, setBodyText] = useState("");

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setCategory("Mind & Emotional Wellbeing");
    setReadingTime("4 min read");
    setDate(
      new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date())
    );
    setImage("/images/service-hypnosis.jpg");
    setBodyText("");
    setModalOpen(true);
  };

  const openEditModal = (blog: BlogItem) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setCategory(blog.category);
    setReadingTime(blog.readingTime);
    setDate(blog.date);
    setImage(blog.image);
    // Convert body sections back to text
    const paragraphs = blog.body?.flatMap((b) => b.paragraphs).join("\n\n") || "";
    setBodyText(paragraphs);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingBlog) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !excerpt) {
      toast.error("Please fill in title, slug, and excerpt.");
      return;
    }

    setSaving(true);
    try {
      const paragraphs = bodyText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        title,
        slug,
        excerpt,
        category,
        readingTime,
        date: date || "Recent",
        image: image || "/images/service-hypnosis.jpg",
        body: [{ paragraphs: paragraphs.length > 0 ? paragraphs : [excerpt] }],
      };

      if (editingBlog?.id || editingBlog?.slug) {
        const idToUpdate = editingBlog.id || editingBlog.slug;
        await updateBlog(idToUpdate, payload);
        toast.success("Blog updated successfully!");
      } else {
        await addBlog(payload);
        toast.success("Blog added successfully!");
      }

      setModalOpen(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog: BlogItem) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    try {
      const idToDelete = blog.id || blog.slug;
      await deleteBlog(idToDelete);
      toast.success("Blog deleted!");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete blog.");
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs by title or category..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading} className="gap-2">
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={openAddModal} className="gap-2">
            <Plus className="size-4" />
            Add New Blog
          </Button>
        </div>
      </div>

      {/* Blogs List */}
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Article</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Read Time</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No articles found. Click &quot;Add New Blog&quot; to publish your first post.
                  </td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr key={blog.slug} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.image || "/images/service-hypnosis.jpg"}
                          alt={blog.title}
                          className="size-12 rounded-md object-cover border border-border shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground line-clamp-1">{blog.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                      {blog.readingTime}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-muted-foreground text-xs">
                      {blog.date}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/resources/${blog.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-foreground/10"
                        title="View Live"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(blog)}
                        className="inline-flex p-1.5 text-brand rounded-md hover:bg-brand/10"
                        title="Edit Article"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        className="inline-flex p-1.5 text-destructive hover:text-destructive rounded-md hover:bg-destructive/10"
                        title="Delete Article"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-card border border-border p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                <h3 className="text-lg font-bold">
                  {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="blog-title">Title *</Label>
                  <Input
                    id="blog-title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 5 Simple Ways to Regulate Your Nervous System"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="blog-slug">Slug URL *</Label>
                  <Input
                    id="blog-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="simple-ways-to-wind-down"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="blog-category">Category</Label>
                  <Input
                    id="blog-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Mind & Emotional Wellbeing"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="blog-readtime">Reading Time</Label>
                  <Input
                    id="blog-readtime"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    placeholder="4 min read"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="blog-date">Date Label</Label>
                  <Input
                    id="blog-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="October 2024"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="blog-image">Image URL or Local Path</Label>
                  <Input
                    id="blog-image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/service-hypnosis.jpg"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="blog-excerpt">Short Excerpt (Summary) *</Label>
                  <Textarea
                    id="blog-excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    placeholder="A brief 1-2 sentence preview for cards and search results..."
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="blog-body">Content Paragraphs (Double line break between paragraphs)</Label>
                  <Textarea
                    id="blog-body"
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    rows={6}
                    placeholder="Type or paste the full content here. Separate distinct paragraphs with an empty line..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
