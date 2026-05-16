import Link from "next/link";
import { categoryToSlug } from "../../../content/posts";

export default function CategoryPills({ categories, active }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
      {categories.map((cat) => {
        const isActive = (cat === "All Blogs" && !active) || cat === active;
        const href =
          cat === "All Blogs" ? "/blog" : `/blog/category/${categoryToSlug(cat)}`;
        return (
          <Link
            key={cat}
            href={href}
            className={`cursor-pointer text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full border transition-colors ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground-soft border-border hover:border-border-strong"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
