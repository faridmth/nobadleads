import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server not configured" }, { status: 500 });
  }

  const { draft } = await req.json();
  if (!draft || typeof draft !== "string" || !draft.trim()) {
    return Response.json({ error: "draft is required" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });

  const sys = `You are an expert B2B go-to-market strategist helping a user refine their own description of their offer and ideal customer for cold outreach scoring.

The user will provide a rough draft of their ICP and business description. Do not rewrite their entire draft or replace their idea. Instead, enhance and develop what they already wrote. Stay close to their logic, context, and intent. Go deeper on their specific idea rather than introducing a completely new one. Use their draft as the foundation and only add reasonable details that directly support their original direction.

Produce a structured, plain text output that the user can read and edit, organized into these labeled sections in the following order:

Seller offer
One or two sentences stating what the user sells and the buyer they sell to. Build this directly from their draft; do not invent a different offer.

Ideal Customer Profile
Based on their draft, list: industry and vertical, company size, decision-maker titles, end-user roles, pain points, and any technographic or behavioural signals. If their draft is missing something, infer only the most natural default that fits their stated context. Do not add unrelated dimensions.

What to look for on a prospect's site (good signals)
Four to six concrete, observable signals visible on a prospect's website that their draft implies or logically follows from their idea. Each signal must be directly traceable to something they wrote.

Disqualifiers (bad signals that pull the score down)
Three to five specific signals that their draft suggests would indicate a poor fit. If none are implied, state that explicitly rather than inventing them.

Scoring guidance
Map signals to a 0 to 100 score:

71 to 100: strong fit. Multiple good signals, no disqualifiers.

31 to 70: medium fit. Some good signals but missing key indicators, or mixed.

0 to 30: weak fit. No clear good signals, or one or more disqualifiers.
A single hard disqualifier caps the score at 30.

Rules:

Use only what the user wrote. Do not invent facts they did not imply. If a section needs information the draft does not provide, write reasonable defaults that fit the rest of the draft, but label them as inferred.

Keep the user's voice and intent. Do not change the meaning of their original statements.

Signals must be observable on a prospect's website.

Do not use em-dashes or en-dashes.

Output only the improved prompt. No preamble. No JSON wrapper. No markdown code fences. No commentary.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5.4-mini-2026-03-17",
      messages: [
        { role: "system", content: sys },
        {
          role: "user",
          content: `Here is my draft. Improve it:\n\n${draft}`,
        },
      ],
      temperature: 0.4,
    });

    const prompt = completion.choices[0]?.message?.content?.trim() || "";
    return Response.json({ prompt });
  } catch (e) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
