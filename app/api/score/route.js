import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const { screenshotUrl, scoringPrompt, lead, siteMeta } = await req.json();

  if (!screenshotUrl) return Response.json({ error: "screenshotUrl is required" }, { status: 400 });
  if (!scoringPrompt) return Response.json({ error: "scoringPrompt is required" }, { status: 400 });

  const client = new OpenAI({ apiKey });

  // Everything substantive is in the user-editable scoringPrompt.
  // The only hardcoded part is the JSON output shape.
  const sys = `${scoringPrompt}

---

Follow all the instructions above to produce a valid score and reasoning for this prospect.

Return STRICT JSON only, with this exact shape and no extra prose:
{
  "score": <integer 0 to 100>,
  "reasoning": "<2 to 3 sentence justification, citing specific signals from the prospect's site>"
}`;

  const leadContext = [
    `URL: ${lead.url}`,
    lead.company && `Company: ${lead.company}`,
    lead.name && `Name: ${lead.name}`,
    lead.job && `Role: ${lead.job}`,
    siteMeta?.title && `Site title: ${siteMeta.title}`,
    siteMeta?.description && `Site description: ${siteMeta.description}`,
    lead.extra && Object.keys(lead.extra).length
      ? `Other lead context:\n${Object.entries(lead.extra)
          .map(([k, v]) => `  ${k}: ${v}`)
          .join("\n")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5.4-mini-2026-03-17",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content: [
            { type: "text", text: leadContext },
            { type: "image_url", image_url: { url: screenshotUrl } },
          ],
        },
      ],
      temperature: 0.4,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);
    return Response.json({
      score: Number(parsed.score) || 0,
      reasoning: parsed.reasoning || "",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
