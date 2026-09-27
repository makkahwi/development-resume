import type { StoredChunk } from '../ai/core.ts';

export type Existing = { id: string; hash?: string };
const namespace = () => encodeURIComponent(process.env.UPSTASH_VECTOR_NAMESPACE || 'makkahwi-ai-v1');
export function assertUpstashConfig(): void {
  if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) throw new Error('Upstash Vector credentials are missing');
  try { const url = new URL(process.env.UPSTASH_VECTOR_REST_URL); if (url.protocol !== 'https:') throw new Error(); } catch { throw new Error('UPSTASH_VECTOR_REST_URL must be HTTPS'); }
}
const base = () => {
  assertUpstashConfig();
  return process.env.UPSTASH_VECTOR_REST_URL!.replace(/\/$/, '');
};
async function call<T>(operation: string, body: unknown): Promise<T> {
  const response = await fetch(`${base()}/${operation}/${namespace()}`, {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.UPSTASH_VECTOR_REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Upstash ${operation} failed (${response.status})`);
  const payload = await response.json() as { result?: T; error?: string };
  if (payload.result === undefined || payload.error) throw new Error(`Invalid Upstash ${operation} response`);
  return payload.result;
}
export async function listExisting(): Promise<Existing[]> {
  const all: Existing[] = [];
  let cursor = '0';
  const cursors = new Set<string>();
  do {
    if (cursors.has(cursor)) throw new Error('Upstash range cursor repeated');
    cursors.add(cursor);
    const page = await call<{ nextCursor: string; vectors: Array<{ id: string; metadata?: { hash?: string } }> }>('range', { cursor, limit: 100, includeMetadata: true });
    if (!Array.isArray(page.vectors) || typeof page.nextCursor !== 'string') throw new Error('Invalid Upstash range page');
    all.push(...page.vectors.map(v => ({ id: v.id, hash: v.metadata?.hash })));
    cursor = page.nextCursor;
  } while (cursor);
  return all;
}
export async function upsert(chunks: Array<{ chunk: StoredChunk; vector: number[] }>): Promise<void> {
  if (!chunks.length) return;
  const result = await call<string>('upsert', chunks.map(({ chunk, vector }) => ({
    id: chunk.id, vector, data: chunk.content,
    metadata: { hash: chunk.hash, documentId: chunk.documentId, documentType: chunk.documentType, title: chunk.title, section: chunk.section, ...chunk.metadata },
  })));
  if (result !== 'Success') throw new Error('Upstash upsert was not confirmed');
}
export async function remove(ids: string[]): Promise<void> {
  if (!ids.length) return;
  const deleted = await call<{ deleted: number }>('delete', { ids });
  if (deleted.deleted !== ids.length) throw new Error(`Upstash deleted ${deleted.deleted} of ${ids.length} stale vectors`);
}
export async function query(vector: number[], topK: number, filter?: string): Promise<StoredChunk[]> {
  const rows = await call<Array<{ id: string; score: number; data?: string; metadata?: Record<string, unknown> }>>('query', { vector, topK, includeData: true, includeMetadata: true, ...(filter ? { filter } : {}) });
  if (!Array.isArray(rows)) throw new Error('Invalid Upstash query response');
  return rows.flatMap(row => {
    const m = row.metadata;
    if (!m || typeof row.data !== 'string' || typeof m.documentId !== 'string' || typeof m.documentType !== 'string' || typeof m.title !== 'string' || typeof m.section !== 'string' || typeof m.hash !== 'string') return [];
    const { documentId, documentType, title, section, hash, ...metadata } = m;
    return [{ id: row.id, content: row.data, documentId, documentType, title, section, hash, metadata, score: row.score }];
  });
}
