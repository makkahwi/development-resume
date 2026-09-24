export type AiConfig = {
  apiKey: string;
  generationModel: string;
  embeddingModel: string;
  embeddingDimensions: number;
  topK: number;
  maxOutputTokens: number;
  maxMessageLength: number;
  maxConversationCharacters: number;
  timeoutMs: number;
  rateLimitRequests: number;
  rateLimitWindowSeconds: number;
};
function integer(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name];
  const value = raw === undefined || raw === '' ? fallback : Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) throw new Error(`${name} must be an integer from ${min} to ${max}`);
  return value;
}
export function getAiConfig(): AiConfig {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is missing');
  return {
    apiKey,
    generationModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
    embeddingModel: process.env.AI_EMBEDDING_MODEL || 'gemini-embedding-2',
    embeddingDimensions: integer('AI_EMBEDDING_DIMENSIONS', 1536, 128, 3072),
    topK: integer('AI_TOP_K', 5, 1, 10),
    maxOutputTokens: integer('AI_MAX_OUTPUT_TOKENS', 700, 100, 2048),
    maxMessageLength: integer('AI_MAX_MESSAGE_LENGTH', 1200, 1, 4000),
    maxConversationCharacters: integer('AI_MAX_CONVERSATION_CHARACTERS', 2400, 0, 6000),
    timeoutMs: integer('AI_TIMEOUT_MS', 20000, 1000, 60000),
    rateLimitRequests: integer('RATE_LIMIT_REQUESTS', 10, 1, 100),
    rateLimitWindowSeconds: integer('RATE_LIMIT_WINDOW_SECONDS', 60, 1, 3600),
  };
}
