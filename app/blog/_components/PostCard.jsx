import Link from "next/link";
import Image from "next/image";
import { author } from "../../../content/author";

function Cover({ cover, size = "md", priority = false }) {
  const aspect = "aspect-[1200/630]";
  const titleSize = {
    sm: "text-xs",
    md: "text-base md:text-lg",
    lg: "text-2xl md:text-4xl",
  };

  if (cover?.image) {
    return (
      <div className={`relative w-full ${aspect}  overflow-hidden bg-surface`}>
        <Image
          src={cover.image}
          alt={cover.alt || cover.title || ""}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 384px, 100vw" : size === "md" ? "(min-width: 768px) 380px, 100vw" : "128px"}
          className="object-cover"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspect} rounded-md overflow-hidden bg-linear-to-br ${cover?.gradient || "from-indigo-600 to-violet-600"}`}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 45%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
        <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">
          nobadleads
        </span>
        <h3 className={`${titleSize[size]} font-bold text-white leading-tight max-w-[85%]`}>
          {cover?.title}
        </h3>
      </div>
    </div>
  );
}

function CategoryTag({ category }) {
  return (
    <span className="inline-flex items-center self-start text-[11px] font-semibold tracking-tight text-brand bg-brand-soft/70 border border-brand/15 px-2.5 py-1 rounded-full">
      {category}
    </span>
  );
}

export function PostCardLarge({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col gap-3 md:gap-4"
    >
      <Cover cover={post.cover} size="lg" />
      <div className="flex flex-col gap-2">
        <CategoryTag category={post.category} />
        <h2 className="text-xl md:text-2xl font-bold leading-snug group-hover:text-brand transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted">
          Running 50 to 250 inboxes across multiple clients without losing a lead requires systems, not
          effort. {author.name} · {post.readTime}
        </p>
      </div>
    </Link>
  );
}

export function PostCardRow({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex gap-3 md:gap-4 items-start"
    >
      <div className="w-24 md:w-32 shrink-0">
        <Cover cover={post.cover} size="sm" />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <CategoryTag category={post.category} />
        <h3 className="text-sm md:text-base font-semibold leading-snug group-hover:text-brand transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted">
          {author.name} · {post.readTime}
        </p>
      </div>
    </Link>
  );
}

export function PostCardGrid({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <Cover cover={post.cover} size="md" />
      <CategoryTag category={post.category} />
      <h3 className="text-base md:text-lg font-semibold leading-snug group-hover:text-brand transition-colors">
        {post.title}
      </h3>
      <p className="text-xs text-muted">
        {author.name} · {post.readTime}
      </p>
    </Link>
  );
}

export { Cover };
