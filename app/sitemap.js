import {
  posts,
  PAGE_SIZE,
  getAllCategories,
  categoryToSlug,
} from "../content/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nobadleads.com";

export default function sitemap() {
  const now = new Date();
  const entries = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tool`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  for (let i = 2; i <= totalPages; i++) {
    entries.push({
      url: `${SITE_URL}/blog/page/${i}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  for (const cat of getAllCategories().filter((c) => c !== "All Blogs")) {
    const slug = categoryToSlug(cat);
    entries.push({
      url: `${SITE_URL}/blog/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    const count = posts.filter((p) => p.category === cat).length;
    const catPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    for (let i = 2; i <= catPages; i++) {
      entries.push({
        url: `${SITE_URL}/blog/category/${slug}/page/${i}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }
  }

  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
