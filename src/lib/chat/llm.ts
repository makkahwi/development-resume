const youApiKey = process.env.YOU_API_KEY ?? "";
const youAgentId = process.env.YOU_AGENT_ID ?? "";
const youApiBaseUrl = process.env.YOU_API_BASE_URL ?? "https://api.you.com/v1";
const YOU_REQUEST_TIMEOUT_MS = Number(process.env.YOU_REQUEST_TIMEOUT_MS ?? 8000);

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

export const callLLM = async (input: string, chatId?: string): Promise<string> => {
  if (!youApiKey || !youAgentId) {
    return "Chat service is not configured. Add YOU_API_KEY and YOU_AGENT_ID.";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), YOU_REQUEST_TIMEOUT_MS);

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
      parsed = bodyText
        ? (JSON.parse(bodyText) as { output?: YouRunOutput[] })
        : null;
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
