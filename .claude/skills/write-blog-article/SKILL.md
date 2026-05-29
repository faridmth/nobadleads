---
name: write-blog-article
description: Produce a publishable, SSG-ready blog post for nobadleads end-to-end — keyword research from materials/keywords.csv, SERP analysis of the top 3 results, drafting that respects materials/article-style-guide.md and materials/on-page-seo.md, wiring into content/posts/index.jsx, requesting a hero image, and verifying the post lands in /sitemap.xml. Invoke when the user says "write a blog article", "/write-blog-article", "new blog post", or anything that asks for a fresh post on a topic.
---

# write-blog-article

You are running the end-to-end blog-creation workflow for nobadleads. The full reference is `materials/blog-creation-playbook.md` — **read it before touching anything**. This SKILL.md is the execution checklist; the playbook is the why behind every step.

## Path resolution — read first

**All file paths in this skill are relative to the current working directory (the project root), NOT to this SKILL.md file.** When the skill says `materials/blog-creation-playbook.md`, the agent must call `Read` with that exact path, which resolves to `<project-root>/materials/blog-creation-playbook.md`. Do not prepend `.claude/skills/write-blog-article/` to any path — those files live at the repo root.

If the user's working directory is `c:\Users\Farid\Desktop\leadqualifier`, then:
- `materials/blog-creation-playbook.md` → `c:\Users\Farid\Desktop\leadqualifier\materials\blog-creation-playbook.md` ✓
- `.claude/skills/write-blog-article/materials/...` → ❌ wrong, this directory does not exist.

## Hard rules

1. **Read the playbook first.** Then re-read it every time a step is unclear. Do not improvise around it.
2. **Stop and ask the user at the two explicit checkpoints below.** Never silently skip them.
3. **Style and quality always beat SEO.** When the on-page-seo checklist conflicts with the style guide, style wins. Never pad a paragraph to hit a word count; never force a keyword into a sentence that reads weird.
4. **The only files a finished run creates or changes:** `content/posts/<slug>.jsx`, `content/posts/index.jsx`, (optionally) `public/blog/<slug>.<ext>`, **and 1–2 older `content/posts/*.jsx` files that receive an inbound link to the new post** (see Phase 3, step 8). Do not edit `app/sitemap.js`, `app/robots.js`, `content/author.js`, or any component file as part of writing a post. When editing older posts for the inbound link, change *only* prose — never their `meta` blocks.
5. **Verify before declaring done.** All four checks in Phase 6 must pass.
6. **No em-dashes (—) or en-dashes (–) anywhere in published content.** Em-dashes are the single most reliable "this was written by AI" tell in 2026, and readers (and SERP scanners) clock them instantly. This applies to **article body, `meta.title`, `meta.excerpt`, `meta.cover.title/alt`, CTA copy, FAQ Qs/As, image alt text — everything that ships to the browser.** Use a period, comma, semicolon, parentheses, or a sentence rewrite instead. Regular hyphens inside compound words (`cold-email`, `high-intent`, `follow-up`) are fine — the rule is specifically about dashes used as **punctuation**. This rule applies to writer output only; the SKILL.md prose itself is allowed to use em-dashes since Google never reads it.

---

## Phase 0 — Load context

Before any other tool call, `Read` the following files in this order (paths are from the project root):

1. `materials/blog-creation-playbook.md` — the full playbook.
2. `materials/article-style-guide.md` — voice, rhythm, CTA rules, plain-English override, hero-image rule, sitemap rule.
3. `materials/on-page-seo.md` — the SEO floor.
4. `materials/keywords.csv` — keyword research, all rows.
5. `content/posts/index.jsx` — the registry. Note every existing slug, title, and category.
6. `content/author.js` — the shared byline. Do not add per-post author fields to meta.
7. **The last 3–5 existing posts in `content/posts/*.jsx`** (most recent by `meta.date`). You are reading them to avoid repeating yourself — see the anti-repetition rule below.

### Anti-repetition rule (read before drafting)

Before writing a single sentence of the new article, skim the recent posts you just loaded and note:

- **Cold-open scenes already used** — the spreadsheet-at-midnight, the Monday-morning-CRM, the rep-staring-at-LinkedIn, etc. Do not reuse any opening scene, setup, or framing device. Pick a fresh angle (different role, different time of day, different artifact on screen, different emotion).
- **Recurring phrases and turns** — stock lines like "here's the thing," "the uncomfortable truth," "what good looks like," "stop guessing, start qualifying," etc. If a phrase appears in a recent post, do not reuse it verbatim — reword.
- **Reused metaphors / framings** — fishing-net, funnel-as-sieve, signal-vs-noise, etc. Pick a new one.
- **Failure-mode names** — do not reuse the same H3 names from prior posts; rename even if the underlying concept overlaps.
- **CTA copy** — already covered in Phase 3, but worth restating: every `<ArticleCTA />` title/body/button must be article-specific and visibly different from prior ones.

A reader who lands on three nobadleads posts in a row should not feel they're reading the same article with the search term swapped. If two posts genuinely need to make the same point, make it from a different angle and with different sentences.

If any of these files genuinely don't exist at the project root, stop and tell the user. Do **not** infer that they're missing from the absence of a `materials/` subfolder inside `.claude/skills/write-blog-article/` — that subfolder is not supposed to exist; the real files live at the repo root.

---

## Phase 1 — Keyword selection

1. From the CSV, build a short list of candidates that:
   - Match informational or commercial intent (skip pure transactional).
   - Have **product fit** — the article must let nobadleads features appear as the natural answer (spreadsheet upload, ICP in plain English, vision model that reads the website, score + reason, three cold openers per lead, no demo/CRM required).
   - KD ≤ 25 preferred; ≥ 40 is a long bet, flag it.
   - Volume ≥ 100/month preferred.
   - Trend (last 4 months in the CSV's trend column) higher than the first 4 — avoid declining keywords.
2. **Cross-check against the registry.** If a candidate overlaps with an existing post's slug, title, or H2s, drop it. Two pages competing for the same query is keyword cannibalization.
3. **Pick exactly one primary keyword.** Tell the user in this exact format and pause for confirmation:

   > **Primary keyword:** `"<phrase>"` — <vol>/mo, KD <n>, <intent>, <trend note>.
   > **Cluster:** `<6–10 supporting phrases>`.
   > **Why this one over the others:** <one or two sentences>.
   >
   > Confirm to proceed, or tell me to pick a different one.

**Checkpoint 1 — wait for user confirmation before continuing.**

---

## Phase 2 — SERP analysis

Once the keyword is confirmed:

1. `WebSearch` the primary keyword. Capture the top 10 organic URLs.
2. Skip pure product pages, aggregators/listicles, and our own site.
3. `WebFetch` the top 3 substantive results. For each, extract:
   - Word count (rough).
   - Top-level H2s in order.
   - Stats with named source + dataset size.
   - Frameworks / acronyms.
   - FAQ presence + number of Qs.
   - Intro hook style.
4. Report findings to the user in a short markdown table, then state:
   - The wedge our article will use (what the top 3 don't do).
   - The target word count (within ±20% of their average, but never pad).

No checkpoint here — proceed straight to Phase 3 once the analysis is reported.

---

## Phase 3 — Draft the article

1. **Pick the slug.** Kebab-case, under 60 chars, lowercase, hyphens only, no stop words, primary keyword inside.
2. **Write the meta object first** (see playbook for exact shape). Fill everything except `cover.image` and `cover.alt` — those land in Phase 5.
   - Title **≤ 46 chars**, primary keyword near the start. The slug page at `app/blog/[slug]/page.jsx` appends ` · nobadleads` (14 chars) to produce the final `<title>` tag, so a 46-char `meta.title` becomes a 60-char rendered title — the SEO cap. Count, don't guess. Semrush has flagged this before (May 2026: 3 posts over the cap).
   - Excerpt 150–160 chars, includes the primary keyword and a soft benefit. Count, don't guess. **Must read like a human wrote it** — see the "AI tells to avoid" block below. Specifically: never open with the primary keyword as the first noun phrase ("Lead scoring software does X…"); never use the construction "Here is how to…" / "Here are the…"; vary the rhythm across posts so two excerpts in the registry don't share the same sentence shape; use a contraction or a specific number where it reads natural.
   - `category` — **pick the most topically relevant category, never default to whatever the previous post used.** Read the post's actual subject (workflow / tactic / framework / tool / market trend) and match it. Reuse an existing registry category only when it genuinely fits; otherwise create a new one (e.g. `"Sales Playbooks"` for operational checklists/process posts, `"AI and Outreach"` for AI-tool-centric posts, `"Lead Generation"` for top-of-funnel acquisition posts). If two posts in a row land in the same category, ask yourself whether the second one is really the same topic or you're just copying the field — copying is a bug.
   - `date` and `updated` — today's date.
   - `featured: false` by default; ask the user before flipping it to true.
   - `faqs` array with 5–8 Q&A entries, each answer 40–80 words, direct answer first.
   - **Never add `author` or `authorBio`** — those are centralized in `content/author.js`.
3. **Plan the H2s using the cluster keywords.** Before writing prose, sketch the H2 list. At least **2–3 H2s must reuse exact phrases from the cluster** you picked in Phase 1 (e.g., if the cluster includes `"lead scoring model"`, an H2 should literally be `"How to build a lead scoring model that holds up"`, not `"Building something durable"`). One H2 must contain the **primary keyword verbatim**. Do not make every H2 keyword-stuffed — 2–3 cluster H2s + 1 primary-keyword H2 out of ~6 total is the right mix; the rest stay editorial. The cluster is the single biggest unused ranking lever — surfacing it in headings tells Google the article covers the full topical neighborhood, not just the head term.
4. **Write the body** following the playbook skeleton:
   1. Cold-open scene (2–4 short paragraphs, second person, present tense).
   2. Pivot containing or immediately followed by the primary keyword (so it lands in the first 100 words).
   3. One-paragraph reframe.
   4. 3–5 named failure modes (H3 each, named not numbered).
   5. Framework/solution section (H2 starting with "How…", numbered list works well).
   6. **One `<ArticleCTA />`** at ~⅔ through. Title echoes a number/moment/named pain from the body. Body is one plain-English sentence naming the concrete action. Button is verb-first, 4–6 words. Required props (`title`, `body`, `cta`) — the component throws at build time if any are missing. **Never use the default home-page copy; never reuse another article's CTA copy.**
   7. Operational checklist / what good looks like.
   8. `<h2>Frequently Asked Questions</h2>` with the same 5–8 Qs from `meta.faqs`, each Q in `<h3>`.
   9. Soft close that restates the thesis in new words.
   10. One inline text CTA in the last paragraph (a link to `/tool` or to a related post). Not a banner.
5. **Plain-English pass.** Re-read every paragraph. If a sentence makes you pause and re-read, rewrite. Replace jargon (*firmographic, behavioral signals, calibrated, infrastructure, ingest, stack, leverage*) with plain words. Sentences flow at 18–30 words. One-sentence paragraphs are rare (max 2 per article).
6. **Tool integration.** Name nobadleads **once in the body** (after the problem is agitated, framed as "what a good tool does") and **once in the closing paragraph**. All other product mentions must read as advice about a good tool, not a pitch.
7. **External links.** Add 2–3 contextual links to authoritative sources (.gov, .edu, or major industry — HubSpot, Salesforce, McKinsey, Gartner, MEDDIC Institute, etc.). **Every external `<a>` MUST include both `target="_blank"` AND `rel="noopener noreferrer"`** — no exceptions. Format:
   ```jsx
   <a
     href="https://example.com/source"
     target="_blank"
     rel="noopener noreferrer"
   >
     anchor text
   </a>
   ```
   `noopener` blocks the linked site from accessing `window.opener` (security); `noreferrer` strips the referrer header (privacy). Internal Next `<Link>` components don't need these attributes — only external `<a>` tags do.
8. **Internal links — outbound and inbound.**
   - **Outbound (from this new post):** 3–5 inline links to `/tool`, `/blog`, or other existing posts. Descriptive anchor text — never "click here." Anchor text should be the *target post's* primary keyword when possible, not generic phrasing.
   - **Inbound (from older posts back to this one):** Pick **1–2 topically related older posts** and edit them to add a contextual link pointing to the new post. Anchor text = the new post's primary keyword. This is the back-linking step writers forget — without it, the new post launches with zero internal authority. Edit the older posts' `.jsx` files directly; do not touch their `meta` blocks. If no older post is topically related enough to host a natural link, say so explicitly in the final report — do not force an awkward link.
9. Write the new file at `content/posts/<slug>.jsx`. Import `ArticleCTA` from `"../../app/blog/_components/ArticleCTA"`.

---

## Phase 4 — Wire into the registry

Edit `content/posts/index.jsx` (at the project root):

1. Add one new `import * as <camelSlug> from "./<slug>.jsx";` line at the top.
2. Add `<camelSlug>,` to the `modules` array.

Without both edits, the post is invisible to the blog index, the slug page's `generateStaticParams`, the sitemap, and category pages.

---

## Phase 5 — Request the hero image

**Checkpoint 2 — stop and ask the user.** Use `AskUserQuestion` with this exact shape:

> What image URL should I use for this article's hero? It becomes the cover, the OG image, and the Twitter Card.
> - **Paste a URL** — recommended 1200×630, hosted in `/public/blog/<slug>.jpg` or a CDN you own.
> - **Use the one in `/public/blog`** if you've already dropped a file there named `<slug>.<ext>`.
> - **Skip** — leave the gradient placeholder (OG previews will not have a real image).

When the user replies:
- **Pasted URL or local path** → set `meta.cover.image` (relative if `/public/...`, absolute if CDN). Also add `meta.cover.alt` — a short sentence describing the image, with the primary keyword if it reads natural.
- **"Use the one in /public/blog"** → `Bash ls public/blog/` to confirm `<slug>.<ext>` exists; wire it.
- **Skip** → leave the gradient cover; proceed.

Never silently fall back without asking.

---

## Phase 6 — Build and verify (the four mandatory checks)

Run all four. If any fails, fix and re-run. Do not declare the article shipped until all four pass.

1. **Registry check.** Confirm by reading `content/posts/index.jsx` that the import line and modules entry both exist.
2. **Build check.** `npm run build`. The route table must list `/blog/<slug>` under `● /blog/[slug]`. If missing, the post is not statically generated — debug before continuing.
3. **Sitemap check.** Run `npm run start` in the background, then `curl -s http://localhost:3000/sitemap.xml | grep <slug>`. The URL must appear. Kill the background server when done.
4. **Robots check.** `curl -s http://localhost:3000/robots.txt`. Must still allow `/`, disallow `/api/`, reference the sitemap. No edits should have happened.

---

## Phase 7 — Final report

Report to the user:

- **Slug** and live URL (`/blog/<slug>`).
- **Files changed:** the three (or two if image was skipped).
- **Verified:** sitemap entry, build success, route generation.
- **Performance reminder:** test with `npm run build && npm run start` in Incognito for real numbers (dev mode + extensions tank scores).

Then stop.

---

## Quality bar (final checklist — every box must be true before reporting done)

- [ ] Zero em-dashes (—) and zero en-dashes (–) in any browser-shipped string (body, title, excerpt, alt, CTA, FAQ).
- [ ] Excerpt does not open with the primary keyword phrase as the subject, does not contain "Here is how / Here are the", and does not reuse a sentence shape from another post's excerpt.
- [ ] `meta.title` ≤ 46 chars (final rendered `<title>` will be ≤ 60 after the ` · nobadleads` suffix).
- [ ] Primary keyword in title, slug, first 100 words, ≥ 1 H2 verbatim.
- [ ] 2–3 H2s reuse exact cluster keywords from Phase 1.
- [ ] 1–2 older posts edited to add an inbound link to the new post (or explicitly reported as "no natural fit").
- [ ] Meta description 150–160 chars.
- [ ] Cover image set in `meta.cover.image` with descriptive `alt` (or user explicitly skipped).
- [ ] Body length within ±20% of SERP top-3 average (or shorter if quality demands it).
- [ ] 3–5 named failure modes under H3s.
- [ ] Math worked on the page at least once where it earns its place.
- [ ] Exactly one `<ArticleCTA />`, ⅔ through, with article-specific copy.
- [ ] FAQ body matches `meta.faqs` exactly.
- [ ] 3–5 internal links, 2–3 external authoritative links with `rel="noopener"`.
- [ ] Plain-English pass done: no untranslated jargon, sentences flow.
- [ ] Tool named twice, woven in as "what a good tool does."
- [ ] No per-post `author` or `authorBio` in meta.
- [ ] `content/posts/index.jsx` updated.
- [ ] `npm run build` clean and route listed.
- [ ] `/sitemap.xml` contains the new URL.
- [ ] `/robots.txt` unchanged.

---

## Invariants the writer must not break

These are site-wide behaviors a finished article relies on. They live in components, not in posts — so a normal blog-writing run never edits them. They are listed here so that if a future change accidentally regresses one, the next run notices.

- **The blog index "What's new" section leads with the most recently published post**, not with a `featured: true` flag. `BlogListing.jsx` derives the hero from `filtered[0]` (the date-sorted registry). Do not reintroduce a `featured`-first hero — when a fresh article ships, it must surface immediately at the top of `/blog` without requiring anyone to toggle a flag on the older post.
- **The article Table of Contents shows H2 headings only — not H3.** `ArticleSidebar.jsx` queries `.prose-blog h2`. The named-failure-mode H3s are intentionally excluded because including them makes the TOC noisy and hard to scan in live use. Do not widen the selector to include H3.

---

## AI tells to avoid — these get content distrusted

In May 2026 the user audited the live SERP and every excerpt the skill had produced looked obviously machine-written. Readers and SEO scanners now flag these tells almost immediately. Avoid all of them in **anything that ships to the browser** (body, meta, alt, CTA, FAQ):

- **Em-dashes (—) and en-dashes (–) as punctuation.** Replace with periods, commas, semicolons, parentheses, or a rewrite. The single most reliable AI fingerprint.
- **"Here is how to / Here are the / Here is what…"** — chatbot scaffolding. Drop the scaffolding and state the thing directly.
- **Tricolons with the same shape every time** ("It's faster, cleaner, and smarter.", "fit, intent, and disqualifier signals", "map the stages, find the leaks, and score the leads"). Tricolons are fine occasionally but not in every excerpt and every paragraph.
- **The "X promises Y, then quietly Z" sentence template.** Used in three of the original excerpts ("software promises clean priorities, then quietly drifts" / "template starts strong, then quietly decays" / "removes the manual triage step that quietly kills"). Pick a different shape.
- **Opening the excerpt with the exact primary keyword phrase as the subject.** Reads as SEO-padding. Lead with the pain, the audience, or a specific number, and place the keyword in the second clause.
- **No contractions anywhere.** Real writing uses "it's", "don't", "you're" naturally. A 600-word post with zero contractions reads robotic.
- **"In today's…", "In the world of…", "When it comes to…", "It's important to note that…"** — all banned.
- **"Leverage, utilize, robust, seamless, holistic, comprehensive, navigate the landscape, unlock the power of"** — banned. Use "use", "strong", "smooth", "whole", "full", "find your way through", "get more out of".
- **Same paragraph length for 6 paragraphs in a row.** Vary it. A 5-word sentence next to a 28-word sentence reads human; uniform 20-word sentences read generated.
- **Every list item starting with the same part of speech.** Mix verbs, nouns, and questions.

A useful test: read the excerpt out loud. If it sounds like a chatbot answering a prompt, rewrite it. If it sounds like something a sales rep would say in a Slack thread, ship it.

## Known pitfalls — never re-introduce these

The playbook has the full list with explanations. The shortlist for fast reference:

- Reusing a prior post's cold-open, metaphor, or stock phrase → check recent posts in Phase 0, pick a fresh angle.
- Choppy three-word punch sentences → write at 18–30 words flowing.
- Jargon (firmographic, behavioral, calibrated…) → plain words.
- CTA copy reused across articles → article-specific or build error.
- CTA text invisible → use `<div>` not `<h3>/<p>` (`.prose-blog` overrides).
- CTA button underlined → inline `style={{ textDecoration: "none" }}`.
- Primary keyword missing from first 100 words → fold into the pivot.
- Rendered `<title>` over 60 chars because writer forgot the ` · nobadleads` suffix → cap `meta.title` at 46 chars.
- Per-post author drift → use `content/author.js`, never override.
- Post invisible because not in registry → Phase 4 + Phase 6 catch it.
- LCP issues → `priority` + explicit `fetchPriority="high"` + preload link are already wired in `[slug]/page.jsx` and `PostCard.jsx`; writers don't have to do anything beyond `meta.cover.image`.
- `bg-gradient-to-br` → use `bg-linear-to-br` in any new code (Tailwind v4).
- Touching `app/sitemap.js` or `app/robots.js` → never.
- Inventing stats → only cite real numbers with named source + dataset size.

End of skill.
