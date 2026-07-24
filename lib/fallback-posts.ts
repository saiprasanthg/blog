import type { Post } from "./types";

export const fallbackPosts: Post[] = [
  {
    id: "fallback-rag",
    title: "How I Think About RAG Before Writing Code",
    slug: "rag-before-code",
    topic: "ai",
    category: "AI",
    read_time: "7 min read",
    summary:
      "A practical map for retrieval, chunking, embeddings, reranking, generation, and evaluation before jumping into implementation.",
    content:
      "RAG starts with the question you want the system to answer. Before writing code, define the documents, chunking strategy, retrieval quality checks, generation prompt, and evaluation examples.",
    tags: ["RAG", "Embeddings", "Evaluation"],
    search: "rag retrieval augmented generation embeddings chunking reranking llm evaluation ai",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-system-design",
    title: "Designing a URL Shortener Without Handwaving",
    slug: "url-shortener-system-design",
    topic: "system-design",
    category: "System Design",
    read_time: "8 min read",
    summary:
      "Capacity estimates, ID generation, database choices, cache strategy, and failure modes in one focused design exercise.",
    content:
      "A good URL shortener design starts with traffic assumptions, then chooses an ID strategy, storage model, redirect path, cache behavior, analytics model, and reliability plan.",
    tags: ["Scale", "Caching", "IDs"],
    search: "url shortener system design capacity database cache id generation reliability api",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
