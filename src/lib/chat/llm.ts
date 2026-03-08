const aiBackendBaseUrl = process.env.AI_BACKEND_BASE_URL ?? "";
const aiBackendTimeoutMs = Number(process.env.AI_BACKEND_TIMEOUT_MS ?? 30000);

const youApiKey = process.env.YOU_API_KEY ?? "";
const youAgentId = process.env.YOU_AGENT_ID ?? "";
const youApiBaseUrl = process.env.YOU_API_BASE_URL ?? "https://api.you.com/v1";
const youRequestTimeoutMs = Number(process.env.YOU_REQUEST_TIMEOUT_MS ?? 20000);

type YouRunOutput = {
  type?: string;
  text?: string;
};

const extractYouAnswerText = (output: YouRunOutput[] | undefined): string | null => {
  if (!Array.isArray(output) || output.length === 0) {
    return null;
  }

  const preferred = output.find(
    (item) => item.type === "message.answer" && typeof item.text === "string",
  );
  if (preferred?.text?.trim()) {
    return preferred.text.trim();
  }

  const firstText = output.find((item) => typeof item.text === "string");
  if (firstText?.text?.trim()) {
    return firstText.text.trim();
  }

  return null;
};

const callAiBackend = async (input: string, chatId?: string): Promise<string> => {
  if (!aiBackendBaseUrl) {
    return "AI backend is not configured. Add AI_BACKEND_BASE_URL.";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), aiBackendTimeoutMs);

  try {
    const res = await fetch(`${aiBackendBaseUrl.replace(/\/$/, "")}/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, chat_id: chatId }),
      cache: "no-store",
      signal: controller.signal,
    });

    const bodyText = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("AI backend request failed", {
        status: res.status,
        body: bodyText.slice(0, 500),
      });
      return "I couldn't get a response from the AI backend. Please try again.";
    }

    let parsed: { answer?: string } | null = null;
    try {
      parsed = bodyText ? (JSON.parse(bodyText) as { answer?: string }) : null;
    } catch {
      console.error("AI backend response parse failed", {
        body: bodyText.slice(0, 500),
      });
      return "I received an invalid response from the AI backend.";
    }

    return parsed?.answer?.trim() || "No answer was returned.";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "The AI backend took too long to respond. Please try again.";
    }

    console.error("AI backend call threw an error", error);
    return "I couldn't connect to the AI backend. Please try again.";
  } finally {
    clearTimeout(timeoutId);
  }
};

const callYouAgent = async (input: string, chatId?: string): Promise<string> => {
  if (!youApiKey || !youAgentId) {
    return "Chat service is not configured. Add AI_BACKEND_BASE_URL or YOU_API_KEY and YOU_AGENT_ID.";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), youRequestTimeoutMs);

  try {
    const res = await fetch(`${youApiBaseUrl}/agents/runs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${youApiKey}`,
        "Content-Type": "application/json",
        ...(chatId ? { "X-Client-Session-Id": chatId } : {}),
      },
      body: JSON.stringify({
        agent: youAgentId,
        stream: false,
        input,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const bodyText = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("You.com API request failed", {
        status: res.status,
        body: bodyText.slice(0, 500),
      });

      if (res.status === 429) {
        return "AI quota is exceeded right now. Please try again later.";
      }

      return "I couldn't get a response from the AI service. Please try again.";
    }

    let parsed: { output?: YouRunOutput[] } | null = null;
    try {
      parsed = bodyText ? (JSON.parse(bodyText) as { output?: YouRunOutput[] }) : null;
    } catch {
      console.error("You.com API response parse failed", {
        body: bodyText.slice(0, 500),
      });
      return "I received an invalid response from the AI service.";
    }

    return extractYouAnswerText(parsed?.output) || "No answer was returned.";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "The AI service took too long to respond. Please try again.";
    }

    console.error("You.com API call threw an error", error);
    return "I couldn't connect to the AI service. Please try again.";
  } finally {
    clearTimeout(timeoutId);
  }
};

export const callLLM = async (input: string, chatId?: string): Promise<string> => {
  if (aiBackendBaseUrl) {
    return callAiBackend(input, chatId);
  }

  return callYouAgent(input, chatId);
};
