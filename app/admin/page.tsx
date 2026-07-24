import type { Metadata } from "next";
import AdminEditor from "@/components/AdminEditor";

export const metadata: Metadata = {
  title: "Admin | Sai's Learning Log",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main>
      <section className="posts-hero" aria-labelledby="admin-title">
        <p className="eyebrow">Private desk</p>
        <h1 id="admin-title">Write a new note</h1>
        <p>Log in with Supabase Auth, write a post, and publish it to the database.</p>
      </section>
      <AdminEditor />
    </main>
  );
}
