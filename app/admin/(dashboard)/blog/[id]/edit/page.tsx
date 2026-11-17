import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { error?: string };
}) {
  const post = await prisma.blogPost.findFirst({ where: { id: params.id, deletedAt: null } });
  if (!post) return notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Edit Blog Post</h1>
      <BlogPostForm post={post} action={action} error={searchParams?.error} />
    </div>
  );
}
