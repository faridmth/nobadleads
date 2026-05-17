import * as aiLeadQualification from "./ai-lead-qualification.jsx";
import * as inboundLeadQualification from "./inbound-lead-qualification.jsx";

const modules = [
  aiLeadQualification,
  inboundLeadQualification,
];

export const posts = modules
  .map((m) => ({ ...m.meta, Content: m.default }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories() {
  const set = new Set();
  posts.forEach((p) => set.add(p.category));
  return ["All Blogs", ...Array.from(set)];
}

export function categoryToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryBySlug(slug) {
  return getAllCategories()
    .filter((c) => c !== "All Blogs")
    .find((c) => categoryToSlug(c) === slug);
}

export const PAGE_SIZE = 9;
