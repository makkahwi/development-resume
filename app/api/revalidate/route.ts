import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (
    !process.env.REVALIDATE_SECRET ||
    token !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const tags: string[] =
    Array.isArray(body.tags) && body.tags.length ? body.tags : ["works"];

  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ ok: true, revalidated: tags });
}
