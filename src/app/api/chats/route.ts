import { listChats } from '@/lib/chat/repository';
import { deviceFrom, handleError, json } from '@/lib/chat/http';
import { ChatError, validId } from '@/lib/chat/model';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try {
    const deviceId = deviceFrom(request);
    const params = new URL(request.url).searchParams;
    const before = params.has('before') ? Number(params.get('before')) : undefined;
    const beforeId = params.get('beforeId') || undefined;
    if (before !== undefined && (!Number.isSafeInteger(before) || before < 0 || !validId(beforeId))) throw new ChatError('Invalid history cursor.', 400);
    return json(await listChats(deviceId, before, beforeId));
  } catch (error) { return handleError(error); }
}
