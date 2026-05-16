"use client";

import dynamic from "next/dynamic";

const ArticleSidebar = dynamic(() => import("./ArticleSidebar"), {
  ssr: false,
  loading: () => <div className="h-px w-full" aria-hidden />,
});

export default function ArticleSidebarLoader({ title }) {
  return <ArticleSidebar title={title} />;
}
