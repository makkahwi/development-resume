import { createHash } from 'node:crypto';

export type KnowledgeChunk = {
  id: string; documentId: string; documentType: string; title: string;
  section: string; content: string; metadata: Record<string, unknown>;
};
export type StoredChunk = KnowledgeChunk & { hash: string; score?: number };
export type Source = { id: string; title: string; section: string; documentType: string; url?: string; sourcePath?: string; score?: number };
export type Draft = { answer: string; sourceIds: string[] };
export const FALLBACK = "I don't have enough information in Suhaib's public knowledge base to answer that reliably.";

const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export function parseChunks(jsonl: string): KnowledgeChunk[] {
  const ids = new Set<string>();
  return jsonl.split(/\r?\n/).filter(Boolean).map((line, index) => {
    let value: unknown;
    try { value = JSON.parse(line); } catch { throw new Error(`Invalid JSON at line ${index + 1}`); }
    if (!object(value) || !['id', 'documentId', 'documentType', 'title', 'section', 'content'].every(key => nonempty(value[key])) || !object(value.metadata)) {
      throw new Error(`Invalid chunk at line ${index + 1}`);
    }
    const chunk = value as KnowledgeChunk;
    if (ids.has(chunk.id)) throw new Error(`Duplicate chunk ID: ${chunk.id}`);
    if (chunk.content.length > 10000) throw new Error(`Chunk too long: ${chunk.id}`);
    ids.add(chunk.id);
    return chunk;
  });
}

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (object(value)) return Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]));
  return value;
}
export function chunkHash(chunk: KnowledgeChunk, model: string): string {
  return createHash('sha256').update(JSON.stringify(stable({ chunk, model }))).digest('hex');
}
export function embeddingText(chunk: KnowledgeChunk): string {
  return `title: ${chunk.title} — ${chunk.section} | text: ${chunk.content}`;
}
export function embeddingQuery(question: string): string {
  return `task: question answering | query: ${question}`;
}
export function validQuestion(value: unknown, maxLength = 1200): value is string {
  return nonempty(value) && value.length <= maxLength;
}
export function validateSources(draft: Draft, retrieved: StoredChunk[]): { answer: string; sources: Source[] } {
  const byId = new Map(retrieved.map(chunk => [chunk.id, chunk]));
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const id of draft.sourceIds) {
    const chunk = byId.get(id);
    if (!chunk || seen.has(id)) continue;
    seen.add(id);
    const { title, section, documentType, score } = chunk;
    const url = typeof chunk.metadata.url === 'string' && /^https?:\/\//.test(chunk.metadata.url) ? chunk.metadata.url : undefined;
    const sourcePath = typeof chunk.metadata.sourcePath === 'string' ? chunk.metadata.sourcePath : undefined;
    sources.push({ id, title, section, documentType, ...(url ? { url } : {}), ...(sourcePath ? { sourcePath } : {}), ...(score === undefined ? {} : { score }) });
  }
  if (!draft.answer.trim() || !sources.length) return { answer: FALLBACK, sources: [] };
  return { answer: draft.answer.trim(), sources };
}
export type ConversationTurn = { role: 'user' | 'assistant'; content: string };
export type GenerationInput = { question: string; context: StoredChunk[]; conversation: ConversationTurn[] };
export interface EmbeddingProvider { embed(text: string): Promise<number[]>; }
export interface LlmProvider { generate(input: GenerationInput): Promise<Draft>; }
export interface RetrievalService { query(vector: number[], topK: number): Promise<StoredChunk[]>; }
export type RagDeps = { embeddingProvider: EmbeddingProvider; retrievalService: RetrievalService; llmProvider: LlmProvider };
export function boundConversation(value: unknown, maxCharacters: number): ConversationTurn[] {
  if (!Array.isArray(value) || maxCharacters <= 0) return [];
  const turns: ConversationTurn[] = [];
  let used = 0;
  for (const item of value.slice(-10).reverse()) {
    if (!object(item) || (item.role !== 'user' && item.role !== 'assistant') || !nonempty(item.content)) continue;
    const content = item.content.slice(0, 600);
    if (used + content.length > maxCharacters) break;
    turns.unshift({ role: item.role, content });
    used += content.length;
  }
  return turns;
}
export async function answerQuestion(question: unknown, deps: RagDeps, topK = 5, maxLength = 1200, conversation: unknown = [], maxConversationCharacters = 2400) {
  if (!validQuestion(question, maxLength)) throw new Error('Invalid question');
  const vector = await deps.embeddingProvider.embed(embeddingQuery(question.trim()));
  if (!vector?.length) throw new Error('Embedding provider returned no vector');
  const matches = await deps.retrievalService.query(vector, topK);
  const context: StoredChunk[] = [];
  let characters = 0;
  for (const chunk of matches) {
    if (characters + chunk.content.length > 12000) continue;
    context.push(chunk);
    characters += chunk.content.length;
  }
  if (!context.length) return { answer: FALLBACK, sources: [] };
  const input = { question: question.trim(), context, conversation: boundConversation(conversation, maxConversationCharacters) };
  return validateSources(await deps.llmProvider.generate(input), context);
}
