import type { Source, ConversationTurn } from '../ai/core.ts';

export type ChatSummary = { id: string; title: string; createdAt: number; updatedAt: number };
export type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; createdAt: number; sources?: Source[]; status?: 'pending' | 'failed' | 'complete' };
export type ChatTurn = { id: string; question: string; createdAt: number; status: 'pending' | 'failed' | 'complete'; answer?: string; sources?: Source[]; answeredAt?: number };
export type ChatRecord = ChatSummary & { turns?: Record<string, ChatTurn>; lease?: { requestId: string; token: string; expiresAt: number } };
export class ChatError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}
export function validId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value);
}
export function claimTurn(record: ChatRecord | null, chatId: string, requestId: string, question: string, token: string, now: number): ChatRecord {
  const chat = record || { id: chatId, title: question.slice(0, 80), createdAt: now, updatedAt: now };
  const existing = chat.turns?.[requestId];
  if (existing && existing.question !== question) throw new ChatError('This message ID has already been used.', 409);
  if (existing?.status === 'complete') return chat;
  if (chat.lease && chat.lease.expiresAt > now) throw new ChatError('An answer is still being prepared. Please try again shortly.', 409);
  if (!existing && Object.keys(chat.turns || {}).length >= 100) throw new ChatError('This conversation is full. Please start a new chat.', 400);
  return { ...chat, updatedAt: now, turns: { ...chat.turns, [requestId]: { id: requestId, question, createdAt: existing?.createdAt || now, status: 'pending' } }, lease: { requestId, token, expiresAt: now + 120000 } };
}
export function completeTurn(chat: ChatRecord | null, requestId: string, token: string, now: number, result?: { answer: string; sources: Source[] }): ChatRecord | undefined {
  if (!chat || chat.lease?.token !== token || !chat.turns?.[requestId]) return undefined;
  const turn = chat.turns[requestId];
  const { lease: _lease, ...rest } = chat;
  void _lease;
  return { ...rest, updatedAt: now, turns: { ...chat.turns, [requestId]: result ? { ...turn, status: 'complete', answer: result.answer, sources: result.sources, answeredAt: now } : { ...turn, status: 'failed' } } };
}
export function chatMessages(chat: ChatRecord): ChatMessage[] {
  return Object.values(chat.turns || {}).sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)).flatMap(turn => {
    const status = turn.status === 'pending' && (!chat.lease || chat.lease.expiresAt <= Date.now()) ? 'failed' : turn.status;
    const messages: ChatMessage[] = [{ id: turn.id, role: 'user', content: turn.question, createdAt: turn.createdAt, status }];
    if (turn.status === 'complete' && turn.answer) messages.push({ id: `${turn.id}-answer`, role: 'assistant', content: turn.answer, createdAt: turn.answeredAt || turn.createdAt, sources: turn.sources || [], status: 'complete' });
    return messages;
  });
}
export function priorConversation(chat: ChatRecord, requestId: string): ConversationTurn[] {
  return chatMessages({ ...chat, turns: Object.fromEntries(Object.entries(chat.turns || {}).filter(([id, turn]) => id !== requestId && turn.status === 'complete')) }).slice(-10).map(({ role, content }) => ({ role, content }));
}
export function summary(chat: ChatRecord): ChatSummary {
  return { id: chat.id, title: chat.title, createdAt: chat.createdAt, updatedAt: chat.updatedAt };
}
