import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sai's Learning Log",
  description: "AI, DSA, system design, and engineering learning notes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Sai's Learning Log home">
            <span className="brand-mark">SL</span>
            <span>Sai's Learning Log</span>
          </Link>
          <nav className="top-nav" aria-label="Primary navigation">
            <Link href="/">Opening</Link>
            <Link href="/posts">Posts</Link>
            <ThemeToggle />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
