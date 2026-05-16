import Link from "next/link";

export default function ArticleCTA({ title, body, cta, href = "/tool" }) {
  if (!title || !body || !cta) {
    throw new Error(
      "ArticleCTA requires `title`, `body`, and `cta` props. Each article must write its own contextual copy — no generic defaults."
    );
  }

  return (
    <div className="not-prose my-10 relative rounded-md p-6 md:p-8 overflow-hidden bg-linear-to-br from-[#0a2a2d] via-[#0d3a3f] to-[#04777f]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(80,220,200,0.45), transparent 50%), radial-gradient(circle at 20% 90%, rgba(40,180,160,0.25), transparent 55%)",
        }}
      />
      <div className="relative">
        <div className="text-xl md:text-2xl font-bold leading-tight text-white">
          {title}
        </div>
        <div className="mt-3 text-sm md:text-[15px] leading-relaxed text-white/85 max-w-2xl">
          {body}
        </div>
        <Link
          href={href}
          style={{ textDecoration: "none" }}
          className="mt-5 inline-flex items-center gap-1.5 bg-white hover:bg-white/90 text-brand font-semibold text-sm px-5 py-2.5 rounded transition-colors"
        >
          {cta} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
