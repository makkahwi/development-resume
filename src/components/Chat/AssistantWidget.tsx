"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

const DEVICE_ID_STORAGE_KEY = "assistant_device_id";
const CHAT_MESSAGES_STORAGE_KEY = "assistant_messages_v1";
const MAX_STORED_MESSAGES = 60;

const createDeviceId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const isMessage = (value: unknown): value is Message => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<Message>;
  return (
    typeof item.id === "string" &&
    (item.role === "user" || item.role === "assistant") &&
    typeof item.content === "string" &&
    typeof item.createdAt === "string"
  );
};

const escapeHtml = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderTranscriptHtml = (messages: Message[]) => {
  const list = messages
    .map(
      (item) => `
      <div style="margin-bottom: 16px; text-align: ${item.role === "user" ? "right" : "left"};">
        <p style="margin: 0 0 6px 0; font-size: 12px; color: #516079; text-transform: uppercase;">${item.role}</p>
        <div style="display: inline-block; padding: 10px 12px; border-radius: 10px; background: ${item.role === "user" ? "#1c3967" : "#e2e2e2"}; color: ${item.role === "user" ? "#fff" : "#0f2032"}; max-width: 90%; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(item.content)}</div>
      </div>
    `,
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Chat Transcript</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 24px; color: #0f2032;">
        <h2 style="margin-top: 0;">Chat Transcript</h2>
        <p style="color: #516079;">Generated at ${new Date().toLocaleString()}</p>
        <hr style="border: none; border-top: 1px solid #d7dde8; margin: 16px 0 20px;" />
        ${list}
      </body>
    </html>
  `;
};

const renderInlineMarkdown = (text: string, keyPrefix: string): ReactNode[] => {
  const tokens = text.split(/(\*\*[^*]+\*\*)/g);
  return tokens
    .filter((token) => token.length > 0)
    .map((token, index) => {
      const key = `${keyPrefix}-${index}`;
      if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
        return <strong key={key}>{token.slice(2, -2)}</strong>;
      }
      return <span key={key}>{token}</span>;
    });
};

const renderAssistantMarkdown = (content: string): ReactNode[] => {
  const lines = content.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index] ?? "";
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(line)) {
      nodes.push(<hr key={`hr-${index}`} className="chat-md-divider" />);
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(headingMatch[1].length, 6);
      nodes.push(
        <p key={`h-${index}`} className={`chat-md-heading chat-md-h${level}`}>
          {renderInlineMarkdown(headingMatch[2], `h-${index}`)}
        </p>,
      );
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test((lines[index] ?? "").trim())) {
        quoteLines.push((lines[index] ?? "").trim().replace(/^>\s?/, ""));
        index += 1;
      }

      nodes.push(
        <blockquote key={`q-${index}`} className="chat-md-quote">
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p key={`q-line-${quoteIndex}`} className="chat-md-paragraph">
              {renderInlineMarkdown(quoteLine, `q-${index}-${quoteIndex}`)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (/^([-*]|\d+[.)])\s+/.test(line)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^([-*]|\d+[.)])\s+/.test((lines[index] ?? "").trim())
      ) {
        items.push((lines[index] ?? "").trim().replace(/^([-*]|\d+[.)])\s+/, ""));
        index += 1;
      }

      nodes.push(
        <ul key={`ul-${index}`} className="chat-md-list">
          {items.map((item, itemIndex) => (
            <li key={`li-${itemIndex}`}>
              {renderInlineMarkdown(item, `li-${index}-${itemIndex}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    nodes.push(
      <p key={`p-${index}`} className="chat-md-paragraph">
        {renderInlineMarkdown(line, `p-${index}`)}
      </p>,
    );
    index += 1;
  }

  return nodes;
};

const AssistantWidget = () => {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";
  const t = useTranslations("Chat");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allSuggestions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) =>
        t(`Suggestions.Q${index + 1}`),
      ).filter(Boolean),
    [lang, t],
  );
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(() =>
    allSuggestions.slice(0, 3),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    document.documentElement.classList.toggle("chat-docked-open", open);
    return () => {
      document.documentElement.classList.remove("chat-docked-open");
    };
  }, [open]);

  useEffect(() => {
    if (allSuggestions.length <= 3) {
      setSuggestedQuestions(allSuggestions);
      return;
    }

    const copy = [...allSuggestions];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const current = copy[index];
      copy[index] = copy[randomIndex];
      copy[randomIndex] = current;
    }

    setSuggestedQuestions(copy.slice(0, 3));
  }, [allSuggestions, lang]);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
      if (existing) {
        setChatId(existing);
      } else {
        const created = createDeviceId();
        localStorage.setItem(DEVICE_ID_STORAGE_KEY, created);
        setChatId(created);
      }

      const storedMessages = localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
      if (!storedMessages) {
        return;
      }

      const parsed = JSON.parse(storedMessages) as unknown;
      if (!Array.isArray(parsed)) {
        return;
      }

      const validMessages = parsed.filter(isMessage);
      if (validMessages.length > 0) {
        setMessages(validMessages.slice(-MAX_STORED_MESSAGES));
      }
    } catch {
      setChatId(createDeviceId());
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAT_MESSAGES_STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)),
      );
    } catch {
      // Ignore storage quota and privacy-mode errors.
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) {
      return;
    }

    setLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, chatId }),
      });

      if (!res.ok) {
        throw new Error("Chat message failed");
      }

      const data = (await res.json()) as {
        chatId: string;
        assistantMessage: Message;
      };

      if (!chatId && data.chatId) {
        setChatId(data.chatId);
      }
      setMessages((prev) => [...prev, data.assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I couldn't get a response from the AI service right now.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadTranscript = () => {
    if (messages.length === 0) {
      return;
    }

    const html = renderTranscriptHtml(messages);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `chat-${chatId || "transcript"}.html`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <aside className={`chat-dock ${open ? "chat-dock-open" : ""}`}>
      {!open ? (
        <button
          aria-expanded={open}
          aria-label="Open chat assistant"
          className="chat-open-btn"
          onClick={() => setOpen(true)}
          type="button"
        >
          <i className="fa-solid fa-comments me-2" />
          Chat
        </button>
      ) : null}

      {open ? (
        <button
          aria-label="Close chat assistant"
          className="chat-close-btn"
          onClick={() => setOpen(false)}
          type="button"
        >
          <i className="fa-solid fa-xmark me-2" />
          Close
        </button>
      ) : null}

      <div
        className={`chat-panel ${open ? "chat-panel-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="chat-panel-header">
          <div>
            <h5 className="mb-1">{t("Header.Title")}</h5>
            <p className="mb-0 small text-secondary">
              {t("Header.Description")}
            </p>
          </div>
          <div className="text-end d-flex align-items-start gap-2">
            <button
              aria-label="Close chat assistant"
              className="chat-panel-mobile-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <small className="badge text-bg-light border text-xs">
              {t("Header.Badge")}
            </small>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <p className="small text-secondary mb-0">{t("Prompt.Start")}</p>
          ) : null}

          {messages.map((item) => (
            <div
              key={item.id}
              className={`chat-message-row ${item.role === "user" ? "chat-message-user" : "chat-message-assistant"}`}
            >
              <p className="chat-message-role">
                {item.role === "user" ? t("Role.User") : t("Role.Assistant")}
              </p>
              <div className="chat-message-bubble">
                {item.role === "assistant"
                  ? renderAssistantMarkdown(item.content)
                  : item.content}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="chat-message-row chat-message-assistant">
              <p className="chat-message-role">{t("Role.Assistant")}</p>
              <div className="chat-message-bubble chat-message-loading">
                <span className="chat-loading-dot" />
                {t("Status.Loading")}
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-suggestions">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              className="chat-suggestion-btn"
              onClick={() => void sendMessage(question)}
              disabled={loading}
              type="button"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="chat-input-wrap">
          <form
            className="d-flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(message);
            }}
          >
            <input
              className="form-control"
              placeholder={t("Input.Placeholder")}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={loading}
              type="submit"
            >
              {loading ? t("Input.Sending") : t("Input.Send")}
            </button>
          </form>

          <button
            className="chat-download-btn btn btn-outline-secondary btn-sm mt-2"
            onClick={downloadTranscript}
            type="button"
          >
            <i className="fa-solid fa-file-arrow-down me-2" />
            {t("DownloadTranscript")}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AssistantWidget;
