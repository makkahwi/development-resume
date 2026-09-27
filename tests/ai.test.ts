import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { answerQuestion, boundConversation, chunkHash, FALLBACK, parseChunks, type StoredChunk } from '../src/lib/ai/core.ts';

const sample: StoredChunk = { id: 'project::1', documentId: 'project', documentType: 'project', title: 'Sanad', section: 'Overview', content: 'Suhaib worked on the Sanad app.', metadata: { url: 'https://example.com/sanad', sourcePath: 'knowledge/projects/sanad.md' }, hash: 'test', score: 0.9 };
test('prepared public corpus validates with unique IDs', () => {
  const chunks = parseChunks(readFileSync('knowledge-base/chunks.jsonl', 'utf8'));
  assert.equal(chunks.length, 121);
  assert.equal(new Set(chunks.map(chunk => chunk.id)).size, chunks.length);
  assert.throws(() => parseChunks('{}'), /Invalid chunk/);
  assert.throws(() => parseChunks(`${JSON.stringify(sample)}\n${JSON.stringify(sample)}`), /Duplicate/);
});
test('hash is stable across metadata key order and changes with content/model', () => {
  const reordered = { ...sample, metadata: { sourcePath: sample.metadata.sourcePath, url: sample.metadata.url } };
  assert.equal(chunkHash(sample, 'model-a'), chunkHash(reordered, 'model-a'));
  assert.notEqual(chunkHash(sample, 'model-a'), chunkHash(sample, 'model-b'));
  assert.notEqual(chunkHash(sample, 'model-a'), chunkHash({ ...sample, content: 'Changed' }, 'model-a'));
});
test('grounded pipeline returns only retrieved citations', async () => {
  const result = await answerQuestion('What did Suhaib build?', {
    embeddingProvider: { embed: async text => { assert.equal(text, 'task: question answering | query: What did Suhaib build?'); return [0.1, 0.2]; } },
    retrievalService: { query: async (vector, topK) => { assert.deepEqual(vector, [0.1, 0.2]); assert.equal(topK, 5); return [sample]; } },
    llmProvider: { generate: async input => { assert.equal(input.context.length, 1); return { answer: 'Suhaib worked on Sanad.', sourceIds: ['invented', sample.id, sample.id] }; } },
  });
  assert.equal(result.sources.length, 1);
  assert.equal(result.sources[0].id, sample.id);
  assert.equal(result.sources[0].url, 'https://example.com/sanad');
});
test('no evidence or invalid citations fall back', async () => {
  const embeddingProvider = { embed: async () => [0.1] };
  const empty = await answerQuestion('Unknown?', { embeddingProvider, retrievalService: { query: async () => [] }, llmProvider: { generate: async () => { throw new Error('must not generate'); } } });
  assert.deepEqual(empty, { answer: FALLBACK, sources: [] });
  const invalid = await answerQuestion('Unknown?', { embeddingProvider, retrievalService: { query: async () => [sample] }, llmProvider: { generate: async () => ({ answer: 'Made up', sourceIds: ['missing'] }) } });
  assert.deepEqual(invalid, { answer: FALLBACK, sources: [] });
});

test('conversation context includes only recent bounded turns', () => {
  assert.deepEqual(boundConversation([{ role: 'user', content: 'old' }, { role: 'assistant', content: 'recent' }, { role: 'system', content: 'ignore' }], 6), [{ role: 'assistant', content: 'recent' }]);
});

test('server rate limit rejects excess requests and resets after window', async () => {
  const { allowRequest } = await import('../src/lib/ai/rate-limit.ts');
  assert.equal(allowRequest('ai-test-client', 2, 60, 1000), true);
  assert.equal(allowRequest('ai-test-client', 2, 60, 1001), true);
  assert.equal(allowRequest('ai-test-client', 2, 60, 1002), false);
  assert.equal(allowRequest('ai-test-client', 2, 60, 61000), true);
});

test('development preview retrieval finds relevant project evidence', async () => {
  const { rankLocalChunks } = await import('../src/lib/ai/local-retrieval.ts');
  const chunks = parseChunks(readFileSync('knowledge-base/chunks.jsonl', 'utf8'));
  const results = rankLocalChunks('What did Suhaib build for Sanad?', chunks, 5);
  assert.equal(results[0].title, 'Sanad');
  assert.ok(results.length <= 5);
});
