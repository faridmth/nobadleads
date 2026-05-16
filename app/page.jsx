import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <header className="px-6 md:px-10 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="inline-flex items-center gap-1 text-base font-semibold tracking-tight">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand h-5 w-5" aria-hidden>
              <path d="M5 5 L21 7 L19 19 L3 17 Z" />
            </svg>
            <span>nobadleads<span className="text-brand">.</span></span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/tool"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Open tool →
          </Link>
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-20">
        <div className="max-w-2xl w-full flex flex-col items-center text-center gap-7">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-foreground">
            Stop emailing
            <br />
            the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand">wrong people.</span>
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-1 md:bottom-2 h-2 md:h-3 bg-brand-soft z-0 rounded-sm"
              />
            </span>
          </h1>

          <p className="text-base md:text-lg text-foreground-soft leading-relaxed max-w-lg">
            Drop your spreadsheet of prospects. AI scores every website against
            your ICP so you know who&apos;s worth your time. Free.
          </p>

          <Link
            href="/tool"
            className="inline-flex items-center justify-center h-12 px-7 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors shadow-sm mt-2"
          >
            Score my leads for free
          </Link>
        </div>
      </section>
    </main>
  );
}
