import { notFound } from "next/navigation";
import { posts, PAGE_SIZE } from "../../../../content/posts";
import BlogListing from "../../_components/BlogListing";

export function generateStaticParams() {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const pages = [];
  for (let i = 2; i <= totalPages; i++) pages.push({ n: String(i) });
  return pages;
}

export async function generateMetadata({ params }) {
  const { n } = await params;
  return {
    title: `Blog — Page ${n} · nobadleads`,
    description:
      "Practical playbooks on cold outreach, ICP scoring, and AI-driven prospecting.",
    alternates: { canonical: `/blog/page/${n}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPaginatedPage({ params }) {
  const { n } = await params;
  const page = parseInt(n, 10);
  if (!Number.isFinite(page) || page < 2) notFound();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  if (page > totalPages) notFound();
  return <BlogListing page={page} />;
}
