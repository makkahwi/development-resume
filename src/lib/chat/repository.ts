import 'server-only';
import { randomUUID } from 'node:crypto';
import { getAdminDatabase } from '../firebase/admin';
import { ChatError, claimTurn, completeTurn, summary, type ChatRecord, type ChatSummary } from './model';
import type { Source } from '../ai/core';

const root = 'makkahwiAi';
const chatRef = (deviceId: string, chatId: string) => getAdminDatabase().ref(`${root}/chats/${deviceId}/${chatId}`);
const summaryRef = (deviceId: string, chatId: string) => getAdminDatabase().ref(`${root}/summaries/${deviceId}/${chatId}`);
async function saveSummary(deviceId: string, chat: ChatRecord) {
  await summaryRef(deviceId, chat.id).transaction((current: ChatSummary | null) => current && current.updatedAt > chat.updatedAt ? current : summary(chat));
}
export async function listChats(deviceId: string, before?: number, beforeId?: string) {
  const ref = getAdminDatabase().ref(`${root}/summaries/${deviceId}`);
  let rows: ChatSummary[];
  try {
    let query = ref.orderByChild('updatedAt');
    if (before !== undefined) query = query.endBefore(before, beforeId);
    const snapshot = await query.limitToLast(21).get();
    rows = Object.values(snapshot.val() || {}) as ChatSummary[];
  } catch (error) {
    // Existing Realtime Databases may not have the optional updatedAt index yet.
    // The small portfolio history can still be loaded and paginated correctly.
    if (!(error instanceof Error) || !/Index not defined.*updatedAt/i.test(error.message)) throw error;
    const snapshot = await ref.get();
    rows = (Object.values(snapshot.val() || {}) as ChatSummary[]).filter(chat =>
      before === undefined || chat.updatedAt < before || (chat.updatedAt === before && chat.id < beforeId!)
    );
  }
  rows.sort((a, b) => b.updatedAt - a.updatedAt || b.id.localeCompare(a.id));
  const chats = rows.slice(0, 20);
  const last = chats.at(-1);
  return { chats, next: rows.length > 20 && last ? { before: last.updatedAt, beforeId: last.id } : null };
}
export async function loadChat(deviceId: string, chatId: string): Promise<ChatRecord | null> {
  return (await chatRef(deviceId, chatId).get()).val() as ChatRecord | null;
}
export async function beginTurn(deviceId: string, chatId: string, requestId: string, question: string) {
  const token = randomUUID();
  let failure: ChatError | undefined;
  const result = await chatRef(deviceId, chatId).transaction((current: ChatRecord | null) => {
    failure = undefined;
    try { return claimTurn(current, chatId, requestId, question, token, Date.now()); }
    catch (error) { failure = error as ChatError; return undefined; }
  });
  if (!result.committed) throw failure || new ChatError('Could not save this message. Please try again.', 503);
  const chat = result.snapshot.val() as ChatRecord;
  await saveSummary(deviceId, chat);
  return { chat, token };
}
export async function finishTurn(deviceId: string, chatId: string, requestId: string, token: string, result?: { answer: string; sources: Source[] }) {
  const ref = chatRef(deviceId, chatId);
  const fetched = (await ref.get()).val() as ChatRecord | null;
  if (!completeTurn(fetched, requestId, token, Date.now(), result)) throw new ChatError('The conversation changed. Reopen it to see the latest messages.', 409);
  let firstCall = true;
  const changed = await ref.transaction((chat: ChatRecord | null) => {
    // Realtime Database may initially invoke a transaction with an empty local
    // cache. Seed only that first call from the preceding server read. A later
    // null means the server record actually changed, so the transaction aborts.
    const base = firstCall && chat === null ? fetched : chat;
    firstCall = false;
    return completeTurn(base, requestId, token, Date.now(), result);
  });
  if (!changed.committed) throw new ChatError('The conversation changed. Reopen it to see the latest messages.', 409);
  const chat = changed.snapshot.val() as ChatRecord;
  await saveSummary(deviceId, chat);
  return chat;
}
