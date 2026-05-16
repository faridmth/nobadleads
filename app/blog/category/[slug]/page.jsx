import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  categoryToSlug,
} from "../../../../content/posts";
import BlogListing from "../../_components/BlogListing";

export function generateStaticParams() {
  return getAllCategories()
    .filter((c) => c !== "All Blogs")
    .map((c) => ({ slug: categoryToSlug(c) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category} · nobadleads Blog`,
    description: `Articles in the ${category} category from nobadleads.`,
    alternates: { canonical: `/blog/category/${slug}` },
    openGraph: {
      title: `${category} · nobadleads Blog`,
      description: `Articles in the ${category} category from nobadleads.`,
      url: `/blog/category/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} · nobadleads Blog`,
      description: `Articles in the ${category} category from nobadleads.`,
    },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return <BlogListing category={category} />;
}
