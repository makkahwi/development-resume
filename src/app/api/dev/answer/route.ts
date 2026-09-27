import { NextResponse } from 'next/server';
import { answerQuestion } from '@/lib/ai/core';
import { GeminiEmbeddingProvider, GeminiLlmProvider, ProviderBusyError, ProviderTimeoutError } from '@/lib/ai/gemini';
import { getAiConfig } from '@/lib/ai/config';
import { queryLocal } from '@/lib/ai/local-retrieval';
import { allowRequest } from '@/lib/ai/rate-limit';
import { assertUpstashConfig, query } from '@/lib/vector/upstash';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  let config;
  try { config = getAiConfig(); } catch (error) { console.error('AI configuration error:', error instanceof Error ? error.message : error); return NextResponse.json({ error: 'AI is not configured' }, { status: 503 }); }
  let vectorReady = true;
  try { assertUpstashConfig(); } catch { vectorReady = false; }
  const client = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (!allowRequest(client, config.rateLimitRequests, config.rateLimitWindowSeconds)) return NextResponse.json({ error: 'Makkahwi AI is temporarily busy. Please try again shortly.' }, { status: 429 });
  const question = body && typeof body === 'object' && 'question' in body ? body.question : undefined;
  try {
    const result = await answerQuestion(question, { embeddingProvider: new GeminiEmbeddingProvider(config), retrievalService: { query: vectorReady ? query : async (_vector, topK) => queryLocal(question as string, topK) }, llmProvider: new GeminiLlmProvider(config) }, config.topK, config.maxMessageLength, body && typeof body === 'object' && 'conversation' in body ? body.conversation : [], config.maxConversationCharacters);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid question') return NextResponse.json({ error: 'Question must be nonempty and within the length limit' }, { status: 400 });
    if (error instanceof ProviderTimeoutError) return NextResponse.json({ error: 'Makkahwi AI is taking longer than expected. Please try again shortly.' }, { status: 504 });
    if (error instanceof ProviderBusyError) return NextResponse.json({ error: 'Makkahwi AI is temporarily busy. Please try again shortly.' }, { status: 429 });
    console.error('Development answer failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Answer generation failed' }, { status: 502 });
  }
}
