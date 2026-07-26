"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { topicLabels, type Topic } from "@/lib/types";

export default function AdminEditor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState<Topic>("system-design");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (!isSupabaseConfigured || !supabase) {
      setStatus("Add your Supabase URL and anon key to .env.local first.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("Login failed. Check your email and password.");
      return;
    }

    const { data: adminGrant, error: adminError } = await supabase
      .from("blog_admins")
      .select("user_id")
      .maybeSingle();

    if (adminError || !adminGrant) {
      await supabase.auth.signOut();
      setStatus("This account is not allowed to publish posts.");
      return;
    }

    setIsAuthed(true);
  }

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setPublishedSlug("");

    if (!supabase) {
      setStatus("Supabase is not configured yet.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const summary = String(formData.get("summary") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const readTime = String(formData.get("readTime") ?? "").trim();
    const tags = String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const search = String(formData.get("search") ?? "").trim();
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    setIsPublishing(true);
    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      topic,
      category: topicLabels[topic],
      read_time: readTime,
      summary,
      content,
      tags,
      search: `${title} ${summary} ${tags.join(" ")} ${search}`,
      published: true,
    });
    setIsPublishing(false);

    if (error) {
      if (error.message.includes("posts_slug_key")) {
        setStatus("A post with this title already exists. Change the title slightly and publish again.");
      } else {
        setStatus(error.message);
      }
      return;
    }

    event.currentTarget.reset();
    setTopic("system-design");
    setPublishedSlug(slug);
    setStatus("Published successfully.");
  }

  return (
    <section className="admin-layout" aria-label="Post editor">
      {!isAuthed ? (
        <form className="admin-card" onSubmit={handleLogin}>
          <h2>Log in</h2>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="button primary" type="submit">
            Unlock editor
          </button>
          <p className="form-note">
            {status || "Use the Supabase Auth user that you add to public.blog_admins."}
          </p>
        </form>
      ) : (
        <form className="admin-card" onSubmit={handlePublish}>
          <h2>New post</h2>
          {publishedSlug ? (
            <div className="publish-success" role="status">
              <strong>Published successfully</strong>
              <p>Your post is live now. You can view it or keep writing another note.</p>
              <div className="success-actions">
                <Link className="button primary" href={`/posts/${publishedSlug}`}>
                  View post
                </Link>
                <Link className="button ghost" href="/posts">
                  All posts
                </Link>
              </div>
            </div>
          ) : null}
          <label>
            <span>Title</span>
            <input name="title" type="text" placeholder="Designing Rate Limiting" required />
          </label>
          <label>
            <span>Topic</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value as Topic)} required>
              <option value="system-design">System Design</option>
              <option value="ai">AI</option>
              <option value="dsa">DSA</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            <span>Read time</span>
            <input name="readTime" type="text" placeholder="6 min read" required />
          </label>
          <label>
            <span>Summary</span>
            <textarea name="summary" placeholder="Short preview shown on the posts page." required />
          </label>
          <label>
            <span>Full post</span>
            <textarea name="content" placeholder="Write the full post here." required />
          </label>
          <label>
            <span>Tags</span>
            <input name="tags" type="text" placeholder="Rate limits, Redis, APIs" required />
          </label>
          <label>
            <span>Search keywords</span>
            <input name="search" type="text" placeholder="rate limiting token bucket redis api system design" />
          </label>
          <button className="button primary" type="submit" disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
          <p className="form-note">{status}</p>
        </form>
      )}
    </section>
  );
}
