export type Topic = "ai" | "dsa" | "system-design" | "other";

export type Post = {
  id: string;
  title: string;
  slug: string;
  topic: Topic;
  category: string;
  read_time: string;
  summary: string;
  content: string;
  tags: string[];
  search: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export const topicLabels: Record<Topic, string> = {
  ai: "AI",
  dsa: "DSA",
  "system-design": "System Design",
  other: "Other",
};
