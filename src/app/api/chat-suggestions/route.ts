import { popularQuestions } from '@/lib/chat/popular-questions';

export const runtime = 'nodejs';
export async function GET() {
  return Response.json(await popularQuestions(), {
    headers: { 'Cache-Control': 'public, max-age=60', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
