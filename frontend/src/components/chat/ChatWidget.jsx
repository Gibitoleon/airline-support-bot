import { useEffect, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import useChatQuery from "../../customhooks/useChatQuery.js";
import useChatHistory from "../../customhooks/useChatHistory.js";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hi there! I'm the Kenya Airways support assistant. Ask me about baggage, check-in, refunds, or any travel question.",
};

const ChatWidget = ({ isOpen, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  /* ---------- Load history — only when the widget opens ---------- */
  const { data: history = [], isLoading: historyLoading } = useChatHistory({
    enabled: isOpen,
  });

  // Seed messages with history once it arrives — but never overwrite live messages
  useEffect(() => {
    if (history.length === 0) return;

    setMessages((prev) => {
      // If we already have live messages beyond the welcome, don't overwrite
      if (prev.length > 1) return prev;
      return [WELCOME_MESSAGE, ...history];
    });
  }, [history]);

  /* ---------- Send new queries ---------- */
  const { sendQuery, isPending } = useChatQuery({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: data?.response ?? "Sorry, I couldn't generate a response.",
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
          isError: true,
        },
      ]);
    },
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (isPending) return;

    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: `q-${Date.now()}`, role: "user", text },
    ]);
    setInput("");

    sendQuery({ query: text });
  };

  return (
    <>
      {/* ---------- Floating toggle ---------- */}
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-colors hover:bg-primary-hover sm:bottom-6 sm:right-6"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* ---------- Panel ---------- */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 flex h-[520px] max-h-[calc(100dvh-6rem)] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl sm:bottom-24 sm:right-6 sm:max-w-[calc(100vw-3rem)]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-elevated px-4 py-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">
                Kenya Airways Support
              </p>
              <p className="flex items-center gap-1.5 truncate text-xs text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {/* History skeleton */}
            {historyLoading && (
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="h-10 w-2/3 animate-pulse rounded-2xl rounded-bl-md bg-surface-light" />
                </div>
                <div className="flex justify-end">
                  <div className="h-10 w-1/2 animate-pulse rounded-2xl rounded-br-md bg-surface-light" />
                </div>
                <div className="flex justify-start">
                  <div className="h-10 w-3/4 animate-pulse rounded-2xl rounded-bl-md bg-surface-light" />
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={[
                    "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-white"
                      : m.isError
                        ? "rounded-bl-md border border-primary/30 bg-primary/5 text-primary"
                        : "rounded-bl-md border border-border bg-elevated text-text",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isPending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-elevated px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-border bg-surface p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isPending || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
