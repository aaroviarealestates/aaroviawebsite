import BlogPostForm from "@/components/admin/BlogPostForm";
import { createPost } from "../actions";

export default function NewPostPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>New Blog Post</h1>
      <BlogPostForm action={createPost} error={searchParams?.error} />
    </div>
  );
}
