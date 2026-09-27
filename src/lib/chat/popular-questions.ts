import 'server-only';
import { getAdminDatabase } from '../firebase/admin';
import type { ChatRecord } from './model';
import { DEFAULT_SUGGESTIONS, rankSuggestions, type SuggestionResult } from './suggestions';

const CACHE_MS = 5 * 60 * 1000;
let cached: { value: SuggestionResult; expiresAt: number } | undefined;
let pending: Promise<SuggestionResult> | undefined;

export function popularQuestions(): Promise<SuggestionResult> {
  if (cached && cached.expiresAt > Date.now()) return Promise.resolve(cached.value);
  if (pending) return pending;
  pending = refresh().finally(() => { pending = undefined; });
  return pending;
}
async function refresh(): Promise<SuggestionResult> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // A cached server-only scan also covers conversations saved before this feature.
    // At portfolio scale this avoids migration or a counter that drifts on retries.
    const snapshot = await Promise.race([
      getAdminDatabase().ref('makkahwiAi/chats').get(),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('History read timed out')), 4000); }),
    ]);
    const devices = (snapshot.val() || {}) as Record<string, Record<string, ChatRecord>>;
    function* records() { for (const chats of Object.values(devices)) yield* Object.values(chats); }
    const value = rankSuggestions(records());
    cached = { value, expiresAt: Date.now() + CACHE_MS };
    return value;
  } catch {
    // Suggestions must never prevent starting a conversation or expose history errors.
    const value = cached?.value || { questions: DEFAULT_SUGGESTIONS, basedOnHistory: false };
    cached = { value, expiresAt: Date.now() + 30000 };
    return value;
  } finally { if (timer) clearTimeout(timer); }
}
