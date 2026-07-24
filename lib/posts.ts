import { fallbackPosts } from "./fallback-posts";
import { isSupabaseConfigured, supabase } from "./supabase";
import type { Post } from "./types";

export async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackPosts;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return fallbackPosts;
  }

  return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
