"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from "react";

import {
  validId,
  type ChatMessage as Message,
  type ChatSummary,
} from "@/lib/chat/model";
const DEVICE_KEY = "makkahwi_device_id";
const CHAT_KEY = "makkahwi_active_chat";
type ChatResponse = { chat: ChatSummary; messages: Message[] };
type HistoryResponse = {
  chats: ChatSummary[];
  next: { before: number; beforeId: string } | null;
};
const MAX_LENGTH = 1200;

import {
  DEFAULT_SUGGESTIONS,
  type SuggestionResult,
} from "@/lib/chat/suggestions";

export function AskBox({ intro }: { intro: ReactNode }) {
  const [started, setStarted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [popularSuggestions, setPopularSuggestions] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/chat-suggestions", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: SuggestionResult | null) => {
        if (
          !controller.signal.aborted &&
          data &&
          Array.isArray(data.questions) &&
          data.questions.length === 3 &&
          data.questions.every(
            (question) =>
              typeof question === "string" && question.length <= 160,
          )
        ) {
          setSuggestions(data.questions);
          setPopularSuggestions(data.basedOnHistory === true);
        }
      })
      .catch(() => {
        /* Keep the starter questions when history is unavailable. */
      });
    return () => controller.abort();
  }, []);
  const introRef = useRef<HTMLDivElement>(null);
  const introBefore = useRef<DOMRect | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const deviceRef = useRef("");
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [nextPage, setNextPage] = useState<HistoryResponse["next"]>(null);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useLayoutEffect(() => {
    const element = introRef.current;
    const before = introBefore.current;
    if (
      !started ||
      !element ||
      !before ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const after = element.getBoundingClientRect();
    if (typeof element.animate !== "function") return;
    element.animate(
      [
        {
          transform: `translate(${before.left - after.left}px, ${before.top - after.top}px)`,
        },
        { transform: "translate(0, 0)" },
      ],
      { duration: 500, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  }, [started]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending]);

  async function request<T>(path: string, body?: object): Promise<T> {
    const response = await fetch(path, {
      method: body ? "POST" : "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(90000),
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceRef.current,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data.error || "The chat service is unavailable. Please try again.",
      );
    return data as T;
  }
  function rememberChat(id: string) {
    try {
      localStorage.setItem(CHAT_KEY, id);
    } catch {
      setStorageAvailable(false);
    }
  }
  function applyChat(data: ChatResponse) {
    setChatId(data.chat.id);
    setMessages(data.messages);
    rememberChat(data.chat.id);
    setChats((items) =>
      [data.chat, ...items.filter((item) => item.id !== data.chat.id)].sort(
        (a, b) => b.updatedAt - a.updatedAt,
      ),
    );
  }
  async function openChat(id: string) {
    if (sendingRef.current) return;
    setLoading(true);
    setError("");
    try {
      applyChat(await request<ChatResponse>(`/api/chats/${id}`));
      setStarted(true);
      setQuestion("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not open this conversation.",
      );
    } finally {
      setLoading(false);
    }
  }
  async function loadHistory(more = false) {
    setLoading(true);
    setHistoryError("");
    try {
      const cursor =
        more && nextPage
          ? `?before=${nextPage.before}&beforeId=${nextPage.beforeId}`
          : "";
      const data = await request<HistoryResponse>(`/api/chats${cursor}`);
      setChats((items) =>
        more
          ? [
              ...items,
              ...data.chats.filter(
                (chat) => !items.some((item) => item.id === chat.id),
              ),
            ]
          : data.chats,
      );
      setNextPage(data.next);
      if (!more && data.chats.length) {
        let selected = data.chats[0].id;
        try {
          const saved = localStorage.getItem(CHAT_KEY);
          if (data.chats.some((chat) => chat.id === saved)) selected = saved!;
        } catch {
          /* Session history still works. */
        }
        applyChat(await request<ChatResponse>(`/api/chats/${selected}`));
        setStarted(true);
      }
    } catch (caught) {
      setHistoryError(
        caught instanceof Error
          ? caught.message
          : "Could not load saved chats.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const saved = localStorage.getItem(DEVICE_KEY);
        deviceRef.current = validId(saved) ? saved : crypto.randomUUID();
        localStorage.setItem(DEVICE_KEY, deviceRef.current);
      } catch {
        deviceRef.current ||= crypto.randomUUID();
        setStorageAvailable(false);
      }
      void loadHistory();
    });
    return () => {
      cancelled = true;
    };
    // Initialize this browser's identity and history once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waiting = messages.some((message) => message.status === "pending");
  useEffect(() => {
    if (!waiting || pending || !chatId) return;
    let cancelled = false;
    const timer = setInterval(() => {
      void request<ChatResponse>(`/api/chats/${chatId}`)
        .then((data) => {
          if (!cancelled) setMessages(data.messages);
        })
        .catch(() => {
          if (!cancelled)
            setError(
              "Could not refresh the answer. Reopen this chat to try again.",
            );
        });
    }, 3000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [waiting, pending, chatId]);

  async function sendQuestion(value: string, retryId?: string) {
    const current = value.trim();
    if (!current || sendingRef.current || loading || waiting || historyError)
      return;
    sendingRef.current = true;
    if (!started) {
      introBefore.current = introRef.current?.getBoundingClientRect() || null;
      setStarted(true);
    }
    const id = chatId || crypto.randomUUID();
    const requestId = retryId || crypto.randomUUID();
    setChatId(id);
    rememberChat(id);
    setMessages((items) => [
      ...items.filter((item) => item.id !== requestId),
      {
        id: requestId,
        role: "user",
        content: current,
        createdAt: Date.now(),
        status: "pending",
      },
    ]);
    setQuestion("");
    setError("");
    setPending(true);
    try {
      applyChat(
        await request<ChatResponse>(`/api/chats/${id}/messages`, {
          question: current,
          requestId,
        }),
      );
    } catch (caught) {
      setError(
        caught instanceof Error && caught.name === "TimeoutError"
          ? "The answer took too long. Please try again."
          : caught instanceof Error
            ? caught.message
            : "Could not answer. Please try again.",
      );
      setMessages((items) =>
        items.map((item) =>
          item.id === requestId ? { ...item, status: "failed" } : item,
        ),
      );
      // The server may have saved the message even if the response was interrupted.
      try {
        applyChat(await request<ChatResponse>(`/api/chats/${id}`));
      } catch {
        /* Keep the local message for retry. */
      }
    } finally {
      sendingRef.current = false;
      setPending(false);
    }
  }
  const busy = pending || loading || waiting;
  function newChat() {
    if (busy) return;
    setChatId("");
    rememberChat("");
    setMessages([]);
    setQuestion("");
    setError("");
    setStarted(chats.length > 0);
    inputRef.current?.focus();
  }

  return (
    <section
      className={`hero chatLayout${started ? " chatStarted" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="chatIntro" ref={introRef}>
        {intro}
        {started && (
          <nav className="chatHistory" aria-label="Saved conversations">
            <button type="button" onClick={newChat} disabled={busy}>
              ＋ New conversation
            </button>
            <div className="chatHistoryList">
              {chats.map((chat) => (
                <button
                  type="button"
                  key={chat.id}
                  disabled={busy}
                  aria-current={chat.id === chatId ? "page" : undefined}
                  onClick={() => void openChat(chat.id)}
                >
                  {chat.title}
                </button>
              ))}
            </div>
            {nextPage && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void loadHistory(true)}
              >
                Load older chats
              </button>
            )}
          </nav>
        )}
      </div>
      <div className="askExperience">
        <div
          ref={logRef}
          className="conversation"
          role="log"
          aria-label="Conversation"
          aria-live="polite"
        >
          {loading && (
            <p className="answerPending" role="status">
              Loading your conversations…
            </p>
          )}
          {messages.length === 0 && !loading && (
            <article className="welcomeMessage">
              <span className="messageLabel">Makkahwi AI</span>
              <h2>Hi, 👋</h2>
              <p>
                You can jump straight into a question. Ask me about Suhaib’s
                work, projects, experiences, or ideas.
              </p>
              <p className="suggestionsLabel">
                {popularSuggestions
                  ? "Popular topics visitors ask about"
                  : "Try a question"}
              </p>
              <div
                className="questionSuggestions"
                aria-label="Suggested questions"
              >
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    disabled={busy || !!historyError}
                    onClick={() => void sendQuestion(suggestion)}
                  >
                    {suggestion}
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </article>
          )}
          {messages.map((message) => (
            <article
              className={`message message-${message.role}`}
              key={message.id}
            >
              <span className="messageLabel">
                {message.role === "user" ? "You" : "Makkahwi AI"}
              </span>
              <p>{message.content}</p>
              {message.status === "failed" && (
                <button
                  type="button"
                  className="retryAnswer"
                  disabled={busy}
                  onClick={() => void sendQuestion(message.content, message.id)}
                >
                  Retry answer
                </button>
              )}
              {message.role === "assistant" &&
                !message.sources?.length &&
                messages.some(
                  (item) =>
                    item.id === message.id.replace(/-answer$/, "") &&
                    item.role === "user",
                ) && (
                  <button
                    type="button"
                    className="retryAnswer"
                    disabled={busy}
                    onClick={() => {
                      const original = messages.find(
                        (item) =>
                          item.id === message.id.replace(/-answer$/, "") &&
                          item.role === "user",
                      );
                      if (original) void sendQuestion(original.content);
                    }}
                  >
                    Ask again
                  </button>
                )}
              {!!message.sources?.length && (
                <div className="messageSources" aria-label="Sources">
                  Sources:{" "}
                  {message.sources.map((source) =>
                    source.url ? (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span key={source.id}>{source.title}</span>
                    ),
                  )}
                </div>
              )}
            </article>
          ))}
          {(pending || waiting) && (
            <p className="answerPending">Finding a grounded answer…</p>
          )}
        </div>
        <form
          className="promptPreview"
          onSubmit={(event) => {
            event.preventDefault();
            void sendQuestion(
              String(new FormData(event.currentTarget).get("question") || ""),
            );
          }}
        >
          <label className="srOnly" htmlFor="question">
            Ask about Suhaib&apos;s work, projects, or experience
          </label>
          <input
            ref={inputRef}
            id="question"
            name="question"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onInput={(event) => setQuestion(event.currentTarget.value)}
            required
            placeholder="Ask about my work, projects, experience..."
            maxLength={MAX_LENGTH}
            autoComplete="off"
            disabled={busy || !!historyError}
          />
          <button
            className="arrow"
            type="submit"
            aria-label="Send question"
            disabled={busy || !!historyError}
          >
            ↗
          </button>
        </form>
        {error && (
          <div className="answerError" role="alert">
            <p>{error}</p>
          </div>
        )}
        {historyError && (
          <div className="answerError" role="alert">
            <p>{historyError}</p>
            <button
              type="button"
              className="retryAnswer"
              disabled={loading}
              onClick={() => void loadHistory()}
            >
              Retry loading history
            </button>
          </div>
        )}
        <p className="phaseNote">
          {storageAvailable
            ? "Conversations are saved for this browser."
            : "Browser storage is unavailable. Keep this page open to access your chats."}{" "}
          Answers use Suhaib’s public knowledge.
        </p>
      </div>
    </section>
  );
}
