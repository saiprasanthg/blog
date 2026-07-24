"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post, Topic } from "@/lib/types";

const filters: Array<{ label: string; value: Topic | "all" }> = [
  { label: "All", value: "all" },
  { label: "AI", value: "ai" },
  { label: "DSA", value: "dsa" },
  { label: "System Design", value: "system-design" },
  { label: "Other", value: "other" },
];

export default function PostsBrowser({ posts }: { posts: Post[] }) {
  const [activeTopic, setActiveTopic] = useState<Topic | "all">("all");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const topicMatches = activeTopic === "all" || post.topic === activeTopic;
      const searchableText = `${post.title} ${post.summary} ${post.tags.join(" ")} ${post.search}`.toLowerCase();
      const searchMatches = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return topicMatches && searchMatches;
    });
  }, [activeTopic, posts, query]);

  return (
    <section className="posts-layout" aria-label="Blog posts">
      <aside className="filter-panel">
        <h2>Topics</h2>
        <label className="search-box" htmlFor="post-search">
          <span>Search</span>
          <input
            id="post-search"
            type="search"
            placeholder="RAG, caching, DP..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-list" role="list" aria-label="Filter posts by topic">
          {filters.map((filter) => (
            <button
              className={`filter ${activeTopic === filter.value ? "active" : ""}`}
              key={filter.value}
              type="button"
              onClick={() => setActiveTopic(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className="archive-note">Keep categories broad. Use tags for the specific ideas inside each note.</p>
      </aside>

      <div className="post-feed">
        {filteredPosts.map((post, index) => (
          <article className={`post-card ${index === 0 ? "featured" : ""}`} key={post.id}>
            <div>
              <p className="post-meta">
                {post.category} . {post.read_time}
              </p>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <div className="tag-row" aria-label="Post tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Link href={`/posts/${post.slug}`} className="read-link">
              Read note
            </Link>
          </article>
        ))}
        {filteredPosts.length === 0 ? <p className="empty-state">No notes match that search yet.</p> : null}
      </div>
    </section>
  );
}
