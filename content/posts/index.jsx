import * as aiLeadQualification from "./ai-lead-qualification.jsx";
import * as inboundLeadQualification from "./inbound-lead-qualification.jsx";
import * as leadQualificationChecklist from "./lead-qualification-checklist.jsx";
import * as leadQualificationProcess from "./lead-qualification-process.jsx";
import * as outboundLeadQualification from "./outbound-lead-qualification.jsx";
import * as leadScoringTemplate from "./lead-scoring-template.jsx";
import * as leadScoringSoftware from "./lead-scoring-software.jsx";
import * as leadQualificationCriteria from "./lead-qualification-criteria.jsx";
import * as automatedLeadQualification from "./automated-lead-qualification.jsx";
import * as howToQualifySalesLeads from "./how-to-qualify-sales-leads.jsx";

const modules = [
  aiLeadQualification,
  inboundLeadQualification,
  leadQualificationChecklist,
  leadQualificationProcess,
  outboundLeadQualification,
  leadScoringTemplate,
  leadScoringSoftware,
  leadQualificationCriteria,
  automatedLeadQualification,
  howToQualifySalesLeads,
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
