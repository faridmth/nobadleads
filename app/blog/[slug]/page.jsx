import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "../../../content/posts";
import { author } from "../../../content/author";
import SiteHeader from "../_components/SiteHeader";
import { Cover, PostCardGrid } from "../_components/PostCard";
import ArticleSidebarLoader from "../_components/ArticleSidebarLoader";
import PostSchema from "../_components/PostSchema";
import AuthorBio from "../_components/AuthorBio";
import BackToTopLoader from "../_components/BackToTopLoader";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = `${post.title} · nobadleads`;
  const url = `/blog/${post.slug}`;
  const image = post.cover?.image;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [author.name],
      images: image ? [{ url: image, alt: post.cover?.alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const Content = post.Content;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {post.cover?.image && (
        <link
          rel="preload"
          as="image"
          href={post.cover.image}
          fetchPriority="high"
        />
      )}
      <PostSchema post={post} />
      <SiteHeader />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="px-6 md:px-10 max-w-6xl mx-auto w-full pt-4 text-xs text-muted"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground-soft truncate max-w-[60vw]">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Top header band */}
      <section className="border-b border-border bg-background">
        <div className="px-6 md:px-10 max-w-6xl mx-auto w-full pt-10 pb-10">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Back to blog
          </Link>

          <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-8 md:gap-10 items-start">
            <div className="min-w-0">
              <span className="inline-flex items-center text-[11px] font-semibold tracking-tight text-brand bg-brand-soft/70 border border-brand/15 px-2.5 py-1 rounded-full">
                {post.category}
              </span>

              <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-foreground">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="text-brand font-semibold">{author.name}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className="mt-1 text-xs text-muted-soft">
                Updated On : <time dateTime={post.date}>{formattedDate}</time>
              </div>
            </div>

            <div className="w-full md:w-96 lg:w-md xl:w-lg shrink-0">
              <Cover cover={post.cover} size="lg" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Body with sidebar */}
      <section className="bg-surface">
        <div className="px-6 md:px-10 max-w-6xl mx-auto w-full pt-10 pb-16">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14 items-start">
            <article className="prose-blog min-w-0 bg-background border border-border rounded-md p-6 md:p-10">
              <Content />
              <AuthorBio />
            </article>

            <ArticleSidebarLoader title={post.title} />
          </div>
        </div>
      </section>

      <BackToTopLoader />

      {related.length > 0 && (
        <section className="px-6 md:px-10 max-w-6xl mx-auto w-full pb-20 border-t border-border pt-14">
          <h2 className="text-brand font-bold text-lg mb-6">Keep reading</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {related.map((p) => (
              <PostCardGrid key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
