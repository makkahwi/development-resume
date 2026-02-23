import { NextRequest, NextResponse } from "next/server";
import { callLLM } from "@/lib/chat/llm";

const fallbackAnswer = "I couldn't get a response from the AI service right now.";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as
    | { message?: string; chatId?: string }
    | null;

  const message = body?.message?.trim();
  if (!message || message.length < 2 || message.length > 2000) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const chatId = body?.chatId || crypto.randomUUID();
  const answer = await callLLM(message, chatId);

  return NextResponse.json({
    chatId,
    assistantMessage: {
      id: crypto.randomUUID(),
      role: "assistant",
      content: answer || fallbackAnswer,
      createdAt: new Date().toISOString(),
    },
  });
}
