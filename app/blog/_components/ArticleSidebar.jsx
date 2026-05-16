"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function ArticleSidebar({ title }) {
  const [headings, setHeadings] = useState([]);
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    let cleanup = () => {};
    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 800);

    const handle = idle(() => {
      const nodes = Array.from(document.querySelectorAll(".prose-blog h2"));
      const items = nodes.map((node) => {
        if (!node.id) node.id = slugify(node.textContent || "");
        return { id: node.id, text: node.textContent };
      });
      setHeadings(items);

      if (typeof window !== "undefined") setShareUrl(window.location.href);

      const article = document.querySelector(".prose-blog");

      const onScroll = () => {
        if (nodes.length === 0) return;
        const threshold = window.innerHeight * 0.35;

        const articleBottom =
          article?.getBoundingClientRect().bottom ?? Infinity;
        if (articleBottom <= window.innerHeight * 0.75) {
          setActiveId(nodes[nodes.length - 1].id);
          return;
        }

        let current = nodes[0].id;
        for (const node of nodes) {
          if (node.getBoundingClientRect().top <= threshold) current = node.id;
          else break;
        }
        setActiveId(current);
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    });

    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(handle);
      }
      cleanup();
    };
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
    <aside className="space-y-5 w-full">
      {/* Table of Contents */}
      <div className="bg-background border border-border rounded-md overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
          aria-expanded={open}
        >
          <span className="text-base font-semibold text-foreground">
            Table of Content
          </span>
          <svg
            className={`h-5 w-5 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && headings.length > 0 && (
          <ul className="px-5 pb-5 space-y-3 border-t border-border pt-4">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block text-sm leading-snug transition-colors ${
                    activeId === h.id
                      ? "text-brand font-semibold"
                      : "text-foreground-soft hover:text-foreground"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA Box */}
      <div className="relative rounded-md p-6 overflow-hidden bg-linear-to-br from-[#0a2a2d] via-[#0d3a3f] to-[#04777f] text-white">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(80,220,200,0.45), transparent 50%), radial-gradient(circle at 20% 90%, rgba(40,180,160,0.25), transparent 55%)",
          }}
        />
        <div className="relative">
          <h3 className="text-lg font-bold leading-tight">
            Stop guessing which leads to call.
          </h3>
          <p className="mt-2 text-sm text-white/80 leading-snug">
            Upload your list and get AI lead scoring in minutes. No setup, no spreadsheets.
          </p>
          <Link
            href="/tool"
            style={{ textDecoration: "none" }}
            className="mt-4 inline-flex items-center gap-1.5 bg-white hover:bg-white/90 text-brand font-semibold text-sm px-4 py-2 rounded transition-colors"
          >
            Score my leads <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Share */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Share this article
        </h4>
        <div className="flex items-center gap-2">
          <ShareLink
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            label="WhatsApp"
            bg="bg-[#25D366]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1.1 2.8 1.2 3 .2.2 2.1 3.3 5.2 4.6 3.1 1.3 3.1.8 3.7.8.5 0 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3c1.5.8 3.2 1.3 5.1 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3C3.6 15.5 3 13.8 3 12 3 7.6 7.1 4 12 4s9 3.6 9 8-4.1 8-9 8z" />
            </svg>
          </ShareLink>
          <ShareLink
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            label="X"
            bg="bg-black"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </ShareLink>
          <ShareLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            label="Facebook"
            bg="bg-[#1877F2]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.23 2.69.23v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
            </svg>
          </ShareLink>
          <ShareLink
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            label="LinkedIn"
            bg="bg-[#0A66C2]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </ShareLink>
        </div>
      </div>
    </aside>
    </div>
  );
}

function ShareLink({ href, label, bg, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className={`${bg} h-8 w-8 rounded flex items-center justify-center hover:opacity-90 transition-opacity`}
    >
      {children}
    </a>
  );
}
