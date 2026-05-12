export const runtime = "nodejs";
export const maxDuration = 90;

function classifyError(msg) {
  const m = msg.toLowerCase();
  if (m.includes("credits remaining") || m.includes("upgrade your plan")) return "credits_exhausted";
  if ((m.includes("invalid") || m.includes("missing")) && m.includes("key")) return "invalid_key";
  return "other";
}

export async function POST(req) {
  let url;
  let userKey;
  try {
    const body = await req.json();
    url = body.url;
    userKey = typeof body.apiKey === "string" && body.apiKey.trim() ? body.apiKey.trim() : undefined;
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body", code: "other" },
      { status: 400 }
    );
  }

  if (!url || typeof url !== "string") {
    return Response.json(
      { success: false, error: "URL is required", code: "missing_url" },
      { status: 400 }
    );
  }

  const freeKey = process.env.SCREENSHOTRENDER_API_KEY;
  const apiKey = userKey || freeKey;

  if (!apiKey) {
    return Response.json(
      { success: false, error: "Server not configured", code: "other" },
      { status: 500 }
    );
  }
  const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  const apiUrl = `https://screenshotrender.com/api/v1/screenshot?apiKey=${apiKey}&url=${encodeURIComponent(
    normalized
  )}&fullPage=true&wait=3`;

  async function attempt() {
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      if (!res.ok || !json.success) {
        const message = json.error || `Screenshot failed (${res.status})`;
        return { ok: false, status: 502, message, code: classifyError(message) };
      }
      return { ok: true, json };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Network error";
      return { ok: false, status: 500, message, code: "other" };
    }
  }

  let result = await attempt();
  if (!result.ok && result.code === "other") {
    result = await attempt();
  }

  if (!result.ok) {
    return Response.json(
      { success: false, error: result.message, code: result.code, usedFreeKey: !userKey },
      { status: result.status }
    );
  }
  return Response.json({ ...result.json, usedFreeKey: !userKey });
}
