import BlogListing from "./_components/BlogListing";

export const metadata = {
  title: "Blog · nobadleads",
  description:
    "Practical playbooks on cold outreach, ICP scoring, and AI-driven prospecting.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · nobadleads",
    description:
      "Practical playbooks on cold outreach, ICP scoring, and AI-driven prospecting.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · nobadleads",
    description:
      "Practical playbooks on cold outreach, ICP scoring, and AI-driven prospecting.",
  },
};

export default function BlogIndexPage() {
  return <BlogListing />;
}
