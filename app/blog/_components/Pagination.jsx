import Link from "next/link";
import { categoryToSlug } from "../../../content/posts";

function buildHref(page, category) {
  const base = category ? `/blog/category/${categoryToSlug(category)}` : "/blog";
  return page > 1 ? `${base}/page/${page}` : base;
}

export default function Pagination({ page, totalPages, category }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "...") pages.push("...");
  }

  return (
    <nav className="flex items-center justify-center gap-1 md:gap-2 pt-10 pb-16 text-sm">
      <Link
        href={buildHref(Math.max(1, page - 1), category)}
        aria-disabled={page === 1}
        className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${
          page === 1
            ? "text-muted-soft pointer-events-none"
            : "text-foreground-soft hover:bg-surface"
        }`}
      >
        ← Previous
      </Link>
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`e${idx}`} className="px-2 text-muted-soft">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p, category)}
            className={`h-8 min-w-8 px-2 rounded-md inline-flex items-center justify-center ${
              p === page
                ? "bg-foreground text-background"
                : "text-foreground-soft hover:bg-surface"
            }`}
          >
            {p}
          </Link>
        )
      )}
      <Link
        href={buildHref(Math.min(totalPages, page + 1), category)}
        aria-disabled={page === totalPages}
        className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${
          page === totalPages
            ? "text-muted-soft pointer-events-none"
            : "text-foreground-soft hover:bg-surface"
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}
