import { notFound } from "next/navigation";
import {
  posts,
  PAGE_SIZE,
  getAllCategories,
  getCategoryBySlug,
  categoryToSlug,
} from "../../../../../../content/posts";
import BlogListing from "../../../../_components/BlogListing";

export function generateStaticParams() {
  const cats = getAllCategories().filter((c) => c !== "All Blogs");
  const params = [];
  for (const cat of cats) {
    const total = posts.filter((p) => p.category === cat).length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    for (let i = 2; i <= totalPages; i++) {
      params.push({ slug: categoryToSlug(cat), n: String(i) });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, n } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category} — Page ${n} · nobadleads Blog`,
    description: `Articles in the ${category} category from nobadleads.`,
    alternates: { canonical: `/blog/category/${slug}/page/${n}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogCategoryPaginatedPage({ params }) {
  const { slug, n } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const page = parseInt(n, 10);
  if (!Number.isFinite(page) || page < 2) notFound();
  const total = posts.filter((p) => p.category === category).length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > totalPages) notFound();
  return <BlogListing category={category} page={page} />;
}
