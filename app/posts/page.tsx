import PostsBrowser from "@/components/PostsBrowser";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <section className="posts-hero" aria-labelledby="posts-title">
        <p className="eyebrow">Notebook index</p>
        <h1 id="posts-title">Posts and learning notes</h1>
        <p>A growing collection of writeups across AI, DSA, system design, and anything else worth keeping.</p>
      </section>
      <PostsBrowser posts={posts} />
    </main>
  );
}
