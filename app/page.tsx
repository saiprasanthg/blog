import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/hero-ai-journal.png" alt="" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">AI . DSA . System Design . Curiosity</p>
          <h1 id="hero-title">A blackboard for the things I learn while building.</h1>
          <p className="hero-copy">
            Notes, mental models, implementation details, interview patterns, and the occasional deep dive from my
            engineering journey.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/posts">
              Explore posts
            </Link>
            <Link className="button ghost" href="/admin">
              Write a note
            </Link>
          </div>
          <dl className="hero-stats" aria-label="Blog highlights">
            <div>
              <dt>4</dt>
              <dd>core tracks</dd>
            </div>
            <div>
              <dt>{posts.length}</dt>
              <dd>published notes</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>learning archive</dd>
            </div>
          </dl>
        </div>
        <aside className="terminal-panel" aria-label="Current learning queue">
          <div className="terminal-bar">
            <span />
            <span />
            <span />
          </div>
          <pre>
            <code>{`currently_learning = [
  "RAG systems",
  "dynamic programming",
  "distributed caching",
  "LLM evaluation"
]`}</code>
          </pre>
        </aside>
      </section>

      <section className="intro-strip" aria-label="Blog purpose">
        <p>
          This blog is for turning scattered study into durable understanding. Each post keeps the useful parts close:
          what clicked, what was confusing, and where the idea shows up in real systems.
        </p>
      </section>

      <section className="topic-section" id="topics" aria-labelledby="topics-title">
        <div className="section-heading">
          <p className="eyebrow">Study tracks</p>
          <h2 id="topics-title">Topics I write about</h2>
        </div>
        <div className="topic-grid">
          {[
            ["AI", "Artificial Intelligence", "LLMs, agents, RAG, prompt design, evaluation, and applied AI projects."],
            ["DS", "DSA", "Patterns, problem breakdowns, complexity tradeoffs, and practice notes."],
            ["SD", "System Design", "Architecture notes, scalability ideas, queues, databases, APIs, and reliability."],
            ["++", "Other Interests", "Career reflections, developer tools, productivity systems, and experiments."],
          ].map(([icon, title, copy]) => (
            <article key={title}>
              <span className="topic-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="latest-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <p className="eyebrow">Start here</p>
          <h2 id="latest-title">Latest learning notes</h2>
        </div>
        <div className="latest-grid">
          {latestPosts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.id}>
              <span>{post.category}</span>
              <strong>{post.title}</strong>
              <small>{post.summary}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
