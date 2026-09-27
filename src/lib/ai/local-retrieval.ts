import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chunkHash, parseChunks, type KnowledgeChunk, type StoredChunk } from './core.ts';

const aliases: Record<string, string[]> = {
  sanad: ['sanad', 'سند'],
  mustaheq: ['mustaheq', 'مستحق'],
  experience: ['experience', 'خبرة', 'تجربة'],
  skills: ['skills', 'مهارات'],
  projects: ['projects', 'مشاريع'],
};
const ignored = new Set(['what', 'did', 'the', 'for', 'from', 'about', 'with', 'his', 'her', 'suhaib', 'صهيب', 'كيف', 'ماذا', 'ماهي', 'كان', 'في', 'من', 'على', 'عن', 'دور', 'مشروع']);
function terms(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []).filter(term => !ignored.has(term)).flatMap(term => {
    const match = Object.entries(aliases).find(([, values]) => values.includes(term));
    return match ? match[1] : [term];
  });
}
export function rankLocalChunks(question: string, chunks: KnowledgeChunk[], topK: number): StoredChunk[] {
  const queryTerms = [...new Set(terms(question))];
  return chunks.map(chunk => {
    const title = chunk.title.toLowerCase();
    const section = chunk.section.toLowerCase();
    const content = chunk.content.toLowerCase();
    const score = queryTerms.reduce((sum, term) => sum + (title === term ? 20 : title.includes(term) ? 5 : 0) + (section.includes(term) ? 3 : 0) + (content.includes(term) ? 1 : 0), 0);
    return { ...chunk, hash: chunkHash(chunk, 'local-preview'), score };
  }).filter(chunk => chunk.score > 0).sort((a, b) => b.score - a.score).slice(0, topK);
}
export async function queryLocal(question: string, topK: number): Promise<StoredChunk[]> {
  const jsonl = await readFile(join(process.cwd(), 'knowledge-base/chunks.jsonl'), 'utf8');
  return rankLocalChunks(question, parseChunks(jsonl), topK);
}
