"use client";

import { useEffect, useState } from "react";
import { Post } from "@/lib/posts";
import { Button } from "../ui/button";
import { useToast } from "./ToastContext";
import { useConfirm } from "./ConfirmContext";
import { getPostsForAdmin } from "@/actions/admin/posts";
import { deletePost } from "@/actions/admin/content";

export default function PostRemover() {
  const { showToast } = useToast();
  const confirm = useConfirm();

  const [posts, setPosts] = useState<Omit<Post, "contentHtml">[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const result = await getPostsForAdmin();
      if (result.success && "posts" in result) {
        setPosts(result.posts);
      } else {
        console.error("Failed to fetch posts", result);
      }
    }
    void fetchPosts();
  }, []);

  const handleDelete = async (title: string) => {
    const confirmed = await confirm({
      title: "Delete?",
      message: `Are you sure you want to delete "${title}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!confirmed) return;

    try {
      const result = await deletePost(title);
      if (!result.success) {
        throw new Error(result.error ?? "Could not remove blog");
      }
      setPosts((prev) => prev.filter((b) => b.title !== title));
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("Failed to delete blog. Please try again.", "error");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Blogs</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No blogs yet.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((blog) => (
            <li
              key={blog.title}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <span>{blog.title}</span>
              <Button
                variant={"destructive"}
                onClick={async () => {
                  await handleDelete(blog.title);
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
