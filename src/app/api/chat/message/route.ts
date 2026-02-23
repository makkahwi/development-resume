import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgeChunks, retrieveRelevantChunks } from "@/lib/chat/knowledge";
import { buildPrompt, callLLM, getFewShotQAs } from "@/lib/chat/llm";

const detectLanguage = (message: string): "en" | "ar" => {
  const arabicChars = message.match(/[\u0600-\u06FF]/g)?.length ?? 0;
  return arabicChars > 2 ? "ar" : "en";
};

const fallbackAnswer = "That information isn't in Suhaib's CV data yet.";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as
    | { message?: string; chatId?: string }
    | null;

  const message = body?.message?.trim();
  if (!message || message.length < 2 || message.length > 2000) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const chatId = body?.chatId || crypto.randomUUID();

  const language = detectLanguage(message);
  const chunks = buildKnowledgeChunks();
  const relevant = retrieveRelevantChunks(message, chunks);
  const fallbackContext = chunks.filter((chunk) => !chunk.private).slice(0, 8);
  const selectedContext = relevant.length > 0 ? relevant : fallbackContext;
  const fewShot = getFewShotQAs(language);

  const prompt = buildPrompt(message, selectedContext, fewShot);
  const answer = await callLLM(prompt);

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
