import Image from "next/image";
import { author } from "../../../content/author";

export default function AuthorBio() {
  return (
    <aside className="not-prose mt-14 border-t border-border pt-8 flex items-start gap-4">
      <div className="h-14 w-14 shrink-0 rounded-full overflow-hidden bg-brand-soft relative">
        <Image
          src={author.image}
          alt={`${author.name}, ${author.role}`}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">
          About {author.name}
        </div>
        {author.role && (
          <div className="text-xs text-muted mt-0.5">{author.role}</div>
        )}
        <p className="mt-2 text-sm text-foreground-soft leading-relaxed">
          {author.bio}
        </p>
      </div>
    </aside>
  );
}
