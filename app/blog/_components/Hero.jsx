export default function BlogHero() {
  return (
    <section className="relative px-6 pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #f5f8ff 0%, #f0fbfc 60%, #ffffff 100%)",
        }}
      />
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-5">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          nobadleads Blog
        </h1>
        <p className="text-base md:text-lg text-foreground-soft max-w-xl">
          Stop emailing the wrong people. Practical playbooks on cold outreach,
          ICP scoring, and AI-driven prospecting.
        </p>
        <form
          action="/api/subscribe"
          method="POST"
          className="mt-2 flex w-full max-w-md gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="flex-1 h-11 px-4 rounded-md border border-border bg-background text-sm placeholder:text-muted-soft focus:outline-none focus:border-foreground transition-colors"
          />
          <button
            type="submit"
            className="h-11 px-5 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}
