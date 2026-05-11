import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const { screenshotUrl, siteUrl, title, description } = await req.json();
  if (!screenshotUrl) return Response.json({ error: "screenshotUrl is required" }, { status: 400 });

  const client = new OpenAI({ apiKey });

  const sys = `You are an expert go-to-market strategist.

You will see a screenshot of the SELLER's product or website (the user running outreach).
Before writing anything, examine it thoroughly and infer:
- The core value proposition and the problem it solves.
- The likely target buyer: industry, role, seniority, team type.
- Key features, use cases, pricing tier signals, customer logos, social proof, tone, design polish, technical depth, and scale signals.
- Any implied vertical or horizontal positioning.

Then produce a single PROSPECT SCORING PROMPT that another AI will use to grade prospect websites against this seller's Ideal Customer Profile. The output is a score and reasoning. Nothing else.

The generated prompt must be self-contained instructions for the evaluating model. It must contain exactly these labeled sections in this order, in plain text that a user can read and edit. No markdown code fences around the final output.

Important: The scoring prompt you write must NOT include any output format specification (no JSON schema, no required keys). The output format is hardcoded separately.

# Seller offer
One or two sentences stating exactly what the seller sells and the buyer they sell to, inferred from the screenshot. Specific, not generic.

# Ideal Customer Profile
A detailed ICP including:
- Industry and vertical (specific, e.g., "B2B SaaS, cloud infrastructure")
- Company size (employees and/or revenue range)
- Decision-maker job titles and end-user roles
- Pain points this product solves
- Technographic or behavioural signals you can deduce from the screenshot (e.g., "uses a modern data stack", "runs paid acquisition", "publishes engineering content", "has a public API", "is hiring revops")

# What to look for on a prospect's site (good signals)
Four to six concrete, observable signals that strongly suggest fit. Each signal must name something literally visible on the prospect's website. Examples of the specificity: "Pricing page with per-seat tiers above $30/month", "Engineering team page with 10+ engineers", "Case studies featuring mid-market or enterprise logos", "API documentation or developer hub", "Hiring page with senior revops or growth roles".

# Disqualifiers (bad signals that pull the score down)
Three to five specific signals that make the prospect a clear poor fit. Examples: "Consumer-only, no B2B offering", "Single-founder freelance shop", "Direct competitor of the seller", "Agency or reseller rather than end buyer", "Pre-product landing page only".

# Scoring guidance
Map signals to a 0 to 100 score:
- 71 to 100: strong fit. Multiple good signals, no disqualifiers.
- 31 to 70: medium fit. Some good signals but missing key indicators, or mixed signals.
- 0 to 30: weak fit. No clear good signals, or one or more hard disqualifiers present.
A single hard disqualifier caps the score at 30 regardless of other signals.

# Reasoning
After scoring, write a 2 to 3 sentence reasoning that ties what was seen on the prospect's site to the ICP and the score. Cite specific observable signals, not generic claims.

Write the entire generated prompt in second person, addressing the evaluating model directly ("You are scoring..."). Be opinionated and specific to this exact seller. Do not use em-dashes or en-dashes anywhere in the output. Output only the prompt text. No preamble. No JSON wrapper. No markdown code fences. No commentary.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5.4-mini-2026-03-17",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Seller site: ${siteUrl || "(unknown)"}\nTitle: ${title || ""}\nDescription: ${description || ""}\n\nStudy the screenshot, then write the scoring prompt.`,
            },
            { type: "image_url", image_url: { url: screenshotUrl } },
          ],
        },
      ],
      temperature: 0.3,
    });

    const prompt = completion.choices[0]?.message?.content?.trim() || "";
    return Response.json({ prompt });
  } catch (e) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
