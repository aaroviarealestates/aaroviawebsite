import BlogPostForm from "@/components/admin/BlogPostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>New Blog Post</h1>
      <BlogPostForm action={createPost} />
    </div>
  );
}
