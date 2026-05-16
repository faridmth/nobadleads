import { author } from "../../../content/author";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nobadleads.com";

export default function PostSchema({ post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.cover?.image
    ? post.cover.image.startsWith("http")
      ? post.cover.image
      : `${SITE_URL}${post.cover.image}`
    : `${SITE_URL}/og/${post.slug}.png`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: author.name,
      description: author.bio,
      image: author.image.startsWith("http")
        ? author.image
        : `${SITE_URL}${author.image}`,
      jobTitle: author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "nobadleads",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-mark.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: post.keywords || undefined,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
