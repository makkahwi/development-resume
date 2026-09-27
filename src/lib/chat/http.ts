import 'server-only';
import { FirebaseConfigurationError } from '../firebase/admin';
import { NextResponse } from 'next/server';
import { ChatError, validId } from './model';
import { ProviderBusyError, ProviderTimeoutError } from '../ai/gemini';

export function deviceFrom(request: Request): string {
  const id = request.headers.get('x-device-id');
  if (!validId(id)) throw new ChatError('A valid browser ID is required.', 400);
  return id;
}
export function chatIdFrom(value: string): string {
  if (!validId(value)) throw new ChatError('Invalid conversation ID.', 400);
  return value;
}
export function json(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}
export function handleError(error: unknown) {
  if (error instanceof FirebaseConfigurationError) {
    console.error('Chat configuration:', error.message);
    return json({ error: process.env.NODE_ENV === 'development' ? error.message : 'Chat history is temporarily unavailable. Please try again shortly.' }, 503);
  }
  if (error instanceof ChatError) return json({ error: error.message }, error.status);
  if (error instanceof ProviderBusyError) return json({ error: 'Makkahwi AI is temporarily busy. Please try again shortly.' }, 429);
  if (error instanceof ProviderTimeoutError) return json({ error: 'The answer took too long. Your message is saved; please retry.' }, 504);
  const details = error instanceof Error ? error.message : '';
  if (process.env.NODE_ENV === 'development') {
    if (/ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ETIMEDOUT|fetch failed|network/i.test(details)) {
      console.error('Chat database connection failed:', error instanceof Error ? error.name : 'UnknownError');
      return json({ error: 'Firebase could not be reached. Check the server network connection and FIREBASE_DATABASE_URL.' }, 503);
    }
    if (/permission.denied|PERMISSION_DENIED/i.test(details)) {
      console.error('Chat database permission denied');
      return json({ error: 'Firebase denied database access. Check the service account project and Realtime Database URL.' }, 503);
    }
    if (/invalid.credential|access.token|unauthorized|401/i.test(details)) {
      console.error('Chat database authentication failed');
      return json({ error: 'Firebase could not authenticate the service account. Check that the project ID, client email, and private key come from the same JSON file.' }, 503);
    }
  }
  const code = error && typeof error === 'object' && 'code' in error && typeof error.code === 'string' ? error.code : undefined;
  if (process.env.NODE_ENV === 'development') {
    const safeMessage = details
      .replace(/-----BEGIN [^-]+-----[\s\S]*?-----END [^-]+-----/g, '[REDACTED KEY]')
      .replace(/https?:\/\/\S+/g, '[URL]')
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+/gi, '[EMAIL]')
      .slice(0, 300);
    const stack = error instanceof Error ? (error.stack || '').split('\n').slice(0, 3).join(' | ') : '';
    const safeStack = stack
      .replace(/-----BEGIN [^-]+-----[\s\S]*?-----END [^-]+-----/g, '[REDACTED KEY]')
      .replace(/https?:\/\/\S+/g, '[URL]')
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+/gi, '[EMAIL]')
      .slice(0, 400);
    console.error(`Chat service failed: ${JSON.stringify({ name: error instanceof Error ? error.name : 'UnknownError', code, message: safeMessage, stack: safeStack })}`);
  } else {
    console.error('Chat service failed:', error instanceof Error ? error.name : 'UnknownError');
  }
  return json({ error: 'We couldn’t load or save this conversation. Please try again.' }, 503);
}
