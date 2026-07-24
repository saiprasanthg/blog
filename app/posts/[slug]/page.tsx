import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article className="article-page">
        <Link className="read-link" href="/posts">
          Back to posts
        </Link>
        <p className="post-meta">
          {post.category} . {post.read_time}
        </p>
        <h1>{post.title}</h1>
        <p className="article-summary">{post.summary}</p>
        <div className="tag-row" aria-label="Post tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="article-body">
          {post.content.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
