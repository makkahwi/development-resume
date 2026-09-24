import { readFile } from 'node:fs/promises';
import { answerQuestion, chunkHash, parseChunks, type StoredChunk } from '../src/lib/ai/core.ts';
import { getAiConfig } from '../src/lib/ai/config.ts';
import { GeminiEmbeddingProvider, GeminiLlmProvider } from '../src/lib/ai/gemini.ts';

const config = getAiConfig();
const chunks = parseChunks(await readFile('knowledge-base/chunks.jsonl', 'utf8'));
const cases = [
  { question: 'What did Suhaib work on in the Sanad project?', term: 'Sanad' },
  { question: 'ما دور صهيب في مشروع مستحق؟', term: 'Mustaheq' },
];
for (const item of cases) {
  const evidence = chunks.filter(chunk => chunk.title.toLowerCase().includes(item.term.toLowerCase())).slice(0, config.topK);
  if (!evidence.length) throw new Error(`No prepared evidence for ${item.term}`);
  const selected: StoredChunk[] = evidence.map(chunk => ({ ...chunk, hash: chunkHash(chunk, config.embeddingModel) }));
  const result = await answerQuestion(item.question, {
    embeddingProvider: new GeminiEmbeddingProvider(config),
    retrievalService: { query: async () => selected },
    llmProvider: new GeminiLlmProvider(config),
  }, config.topK, config.maxMessageLength);
  console.log(JSON.stringify({ question: item.question, answer: result.answer, sourceIds: result.sources.map(source => source.id) }, null, 2));
}
