import {
  revalidateAllPaths,
  revalidateBlogPaths,
  revalidateClientsPaths,
  revalidateJobsPaths,
  revalidateProjectsPaths,
  revalidateSkillsPaths,
  revalidateTestimonialsPaths,
  revalidateTraineesPaths,
} from "@/lib/revalidation";
import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for triggering revalidation from external sources
 *
 * Usage:
 * POST /api/revalidate
 * Headers: x-revalidate-token: <SECRET_TOKEN>
 * Body: { "collection": "clients" | "jobs" | "projects" | "trainees" | "skills" | "blog" | "testimonials" | "all" }
 *
 * Example with Firebase Cloud Function or external webhook:
 * ```
 * fetch('https://yourdomain.com/api/revalidate', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'x-revalidate-token': process.env.REVALIDATE_SECRET_TOKEN
 *   },
 *   body: JSON.stringify({ collection: 'clients' })
 * });
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token to prevent unauthorized revalidation
    const token = request.headers.get("x-revalidate-token");
    const secretToken = process.env.REVALIDATE_SECRET_TOKEN;

    if (!secretToken) {
      return NextResponse.json(
        {
          error:
            "Revalidation not configured. Set REVALIDATE_SECRET_TOKEN in environment variables.",
        },
        { status: 500 }
      );
    }

    if (token !== secretToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse the collection to revalidate
    const body = await request.json();
    const { collection } = body;

    if (!collection) {
      return NextResponse.json(
        { error: "Missing 'collection' parameter" },
        { status: 400 }
      );
    }

    // Revalidate based on collection
    switch (collection) {
      case "clients":
        await revalidateClientsPaths();
        break;
      case "jobs":
        await revalidateJobsPaths();
        break;
      case "projects":
        await revalidateProjectsPaths();
        break;
      case "trainees":
        await revalidateTraineesPaths();
        break;
      case "skills":
        await revalidateSkillsPaths();
        break;
      case "blog":
        await revalidateBlogPaths();
        break;
      case "testimonials":
        await revalidateTestimonialsPaths();
        break;
      case "all":
        await revalidateAllPaths();
        break;
      default:
        return NextResponse.json(
          { error: `Unknown collection: ${collection}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      collection,
      revalidatedAt: new Date().toISOString(),
      message: `Successfully revalidated paths for ${collection}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to revalidate",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if the webhook is working
export async function GET() {
  return NextResponse.json({
    message: "Revalidation webhook endpoint",
    usage:
      "POST with { collection: 'clients' | 'jobs' | ... } and x-revalidate-token header",
  });
}
