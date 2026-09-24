import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chunkHash, embeddingText, parseChunks, type StoredChunk } from '../src/lib/ai/core.ts';
import { GeminiEmbeddingProvider } from '../src/lib/ai/gemini.ts';
import { getAiConfig } from '../src/lib/ai/config.ts';
import { listExisting, remove, upsert } from '../src/lib/vector/upstash.ts';

async function main() {
  if (!process.argv.includes('--execute')) {
    console.error('Explicit ingestion requires --execute. Example: npm run ai:ingest -- --execute');
    process.exitCode = 2;
    return;
  }
  const chunks = parseChunks(await readFile(resolve('knowledge-base/chunks.jsonl'), 'utf8'));
  if (!chunks.length) throw new Error('Refusing to ingest an empty corpus');
  const config = getAiConfig();
  const model = `${config.embeddingModel}:${config.embeddingDimensions}:qa-v1`;
  const embeddings = new GeminiEmbeddingProvider(config);
  const prepared: StoredChunk[] = chunks.map(chunk => ({ ...chunk, hash: chunkHash(chunk, model) }));
  const existing = await listExisting();
  const byId = new Map(existing.map(item => [item.id, item.hash]));
  const changed = prepared.filter(chunk => byId.get(chunk.id) !== chunk.hash);
  const current = new Set(prepared.map(chunk => chunk.id));
  const stale = existing.filter(item => !current.has(item.id)).map(item => item.id);
  console.log(`Validated ${chunks.length} chunks; ${changed.length} changed, ${chunks.length - changed.length} unchanged, ${stale.length} stale.`);
  for (let i = 0; i < changed.length; i += 16) {
    const batch = changed.slice(i, i + 16);
    const vectors = await embeddings.embedMany(batch.map(embeddingText));
    await upsert(batch.map((chunk, j) => ({ chunk, vector: vectors[j] })));
    console.log(`Upserted ${Math.min(i + batch.length, changed.length)}/${changed.length}`);
  }
  for (let i = 0; i < stale.length; i += 100) await remove(stale.slice(i, i + 100));
  console.log(`Ingestion complete. Removed ${stale.length} stale vectors.`);
}
main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
