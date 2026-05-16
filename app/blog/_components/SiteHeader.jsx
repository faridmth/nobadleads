import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="px-6 md:px-10 py-5 flex items-center justify-between border-b border-border">
      <Link href="/" className="flex items-center">
        <span className="inline-flex items-center gap-1 text-base font-semibold tracking-tight">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand h-5 w-5" aria-hidden>
            <path d="M5 5 L21 7 L19 19 L3 17 Z" />
          </svg>
          <span>
            nobadleads<span className="text-brand">.</span>
          </span>
        </span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <Link href="/blog" className="text-foreground-soft hover:text-foreground transition-colors">
          Blog
        </Link>
        <Link
          href="/tool"
          className="font-medium text-muted hover:text-foreground transition-colors"
        >
          Open tool →
        </Link>
      </nav>
    </header>
  );
}
