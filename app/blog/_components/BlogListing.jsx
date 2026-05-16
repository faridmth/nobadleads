import { posts, PAGE_SIZE, getAllCategories } from "../../../content/posts";
import SiteHeader from "./SiteHeader";
import BlogHero from "./Hero";
import CategoryPills from "./CategoryPills";
import Pagination from "./Pagination";
import { PostCardLarge, PostCardRow, PostCardGrid } from "./PostCard";

export default function BlogListing({ category = null, page = 1 }) {
  const filtered = category
    ? posts.filter((p) => p.category === category)
    : posts;

  const featured = filtered.filter((p) => p.featured);
  const heroFeatured = featured[0] || filtered[0];
  const sideFeatured = (
    featured.length > 1 ? featured.slice(1) : filtered.slice(1, 4)
  ).slice(0, 3);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const categories = getAllCategories();
  const showFeatured = !category && safePage === 1 && heroFeatured;

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <BlogHero />

      <div className="relative z-10 px-6 pb-10 -mt-4">
        <CategoryPills categories={categories} active={category} />
      </div>

      {showFeatured && (
        <section className="px-6 md:px-10 max-w-6xl mx-auto w-full pb-16">
          <h2 className="text-brand font-bold text-lg mb-6">What&apos;s new</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <PostCardLarge post={heroFeatured} />
            <div className="flex flex-col gap-5">
              {sideFeatured.map((p) => (
                <PostCardRow key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 md:px-10 max-w-6xl mx-auto w-full">
        <h2 className="text-brand font-bold text-lg mb-6">
          {category ? category : "All blogs"}
        </h2>
        {paginated.length === 0 ? (
          <p className="text-muted text-sm">No posts in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {paginated.map((p) => (
              <PostCardGrid key={p.slug} post={p} />
            ))}
          </div>
        )}
        <Pagination page={safePage} totalPages={totalPages} category={category} />
      </section>

      <div className="h-20 md:h-28" aria-hidden />
    </main>
  );
}
