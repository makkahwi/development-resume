import { loadChat } from '@/lib/chat/repository';
import { deviceFrom, chatIdFrom, handleError, json } from '@/lib/chat/http';
import { chatMessages, summary, ChatError } from '@/lib/chat/model';
export const runtime = 'nodejs';
export async function GET(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const chat = await loadChat(deviceFrom(request), chatIdFrom((await params).chatId));
    if (!chat) throw new ChatError('Conversation not found on this browser.', 404);
    return json({ chat: summary(chat), messages: chatMessages(chat) });
  } catch (error) { return handleError(error); }
}
