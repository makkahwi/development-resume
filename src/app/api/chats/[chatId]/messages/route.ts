import { beginTurn, finishTurn } from '@/lib/chat/repository';
import { deviceFrom, chatIdFrom, handleError, json } from '@/lib/chat/http';
import { ChatError, validId, priorConversation, chatMessages, summary } from '@/lib/chat/model';
import { getAiConfig } from '@/lib/ai/config';
import { answerQuestion, validQuestion } from '@/lib/ai/core';
import { GeminiEmbeddingProvider, GeminiLlmProvider } from '@/lib/ai/gemini';
import { allowRequest } from '@/lib/ai/rate-limit';
import { query } from '@/lib/vector/upstash';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const deviceId = deviceFrom(request);
    const chatId = chatIdFrom((await params).chatId);
    const text = await request.text();
    if (text.length > 10000) throw new ChatError('Message is too large.', 413);
    let body;
    try { body = JSON.parse(text); } catch { throw new ChatError('Invalid message.', 400); }
    const config = getAiConfig();
    if (!body || !validId(body.requestId) || !validQuestion(body.question, config.maxMessageLength)) throw new ChatError('Enter a valid question within the length limit.', 400);
    if (!allowRequest(`chat:${deviceId}`, config.rateLimitRequests, config.rateLimitWindowSeconds)) throw new ChatError('Makkahwi AI is temporarily busy. Please try again shortly.', 429);
    const requestId = body.requestId as string;
    const question = body.question.trim();
    const { chat, token } = await beginTurn(deviceId, chatId, requestId, question);
    if (chat.turns?.[requestId]?.status === 'complete') return json({ chat: summary(chat), messages: chatMessages(chat) });
    let answer;
    try {
      answer = await answerQuestion(question, { embeddingProvider: new GeminiEmbeddingProvider(config), retrievalService: { query }, llmProvider: new GeminiLlmProvider(config) }, config.topK, config.maxMessageLength, priorConversation(chat, requestId), config.maxConversationCharacters);
    } catch (error) {
      await finishTurn(deviceId, chatId, requestId, token);
      throw error;
    }
    const saved = await finishTurn(deviceId, chatId, requestId, token, answer);
    return json({ chat: summary(saved), messages: chatMessages(saved) });
  } catch (error) { return handleError(error); }
}
