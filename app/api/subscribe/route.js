import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();
  const email = form.get("email");
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  console.log("[blog/subscribe]", email);
  return NextResponse.redirect(new URL("/blog?subscribed=1", req.url), 303);
}
