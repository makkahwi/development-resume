import { api, isApiConfigured } from "./api";

/**
 * Shape of the data we expect for the Home page snapshots.
 * You can adjust these interfaces as we flesh out the real schema.
 */
export interface HomeSnapshots {
  aboutSummary: string;
  handsOnHighlight: string;
  handsOffHighlight: string;
  nonprofitHighlight: string;
  latestBlogTitle: string | null;
}

/**
 * Fetch Home snapshots from backend.
 * 
 * - If NEXT_PUBLIC_API_BASE_URL is set, we try calling:
 *     GET /public/home-snapshots
 *   (you can change this path later).
 * - If not configured, we return static mock data for now.
 */
export async function getHomeSnapshots(): Promise<HomeSnapshots> {
  if (!isApiConfigured()) {
    // Fallback mock data until backend is ready.
    return {
      aboutSummary:
        "Senior full-stack developer and technical advisor with experience in SaaS, EdTech, and ERP.",
      handsOnHighlight:
        "Architected and delivered multiple production-grade systems using React & NestJS.",
      handsOffHighlight:
        "Led and mentored teams, established coding standards, and reviewed complex features.",
      nonprofitHighlight:
        "Built free-of-charge tools and provided training/coaching for new developers.",
      latestBlogTitle: null,
    };
  }

  // When API is configured, call your real endpoint
  // e.g. GET https://api.suhaib.dev/public/home-snapshots
  const response = await api.get<HomeSnapshots>("/public/home-snapshots");
  return response.data;
}
