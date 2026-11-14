import { useEffect, useState } from "react";
import { Loader2, MessageCircle, Send, Star, X } from "lucide-react";

import useChatQuery from "../../customhooks/useChatQuery.js";
import useChatHistory from "../../customhooks/useChatHistory.js";
import useCreateFeedback from "../../customhooks/useCreateFeedback.js";
import FetchApi from "../../utils/fetch.js";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hi there! I'm the Kenya Airways support assistant. Ask me about baggage, check-in, refunds, or any travel question.",
};

const ChatWidget = ({ isOpen, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  /* ---------- RAG warm-up state ---------- */
  // null = checking, false = warming, true = ready
  const [ragReady, setRagReady] = useState(null);

  /* ---------- Feedback State ---------- */
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { submitFeedback, isPending: isSubmittingFeedback } = useCreateFeedback(
    {
      onSuccess: () => {
        setFeedbackMessage(null);
        setRating(0);
        setComment("");
      },
    },
  );

  /* ---------- Load history ---------- */
  const { data: history = [], isLoading: historyLoading } = useChatHistory({
    enabled: isOpen,
  });

  useEffect(() => {
    if (history.length === 0) return;
    setMessages((prev) => {
      if (prev.length > 1) return prev;
      return [WELCOME_MESSAGE, ...history];
    });
  }, [history]);

  /* ---------- Warm-up polling (only while widget open) ---------- */
  useEffect(() => {
    if (!isOpen) {
      // Reset so reopening re-checks — RAG may have slept while we were closed.
      setRagReady(null);
      return;
    }

    let cancelled = false;
    let intervalId = null;
    const startedAt = Date.now();

    const check = async () => {
      if (cancelled) return "cancelled";
      if (Date.now() - startedAt > 180_000) {
        // 3-minute bailout — RAG isn't coming up.
        if (intervalId) clearInterval(intervalId);
        return "timeout";
      }
      try {
        const data = await FetchApi("/health/gethealth", "GET");
        if (cancelled) return "cancelled";
        if (data.services?.rag === "healthy") {
          setRagReady(true);
          if (intervalId) clearInterval(intervalId);
          return "ready";
        }
        setRagReady(false);
        return "not-ready";
      } catch {
        if (cancelled) return "cancelled";
        setRagReady(false);
        return "not-ready";
      }
    };

    (async () => {
      const result = await check();
      if (cancelled || result === "ready" || result === "cancelled") return;
      // Not ready yet — start polling every 5s until healthy.
      intervalId = setInterval(async () => {
        const r = await check();
        if (r === "ready" && intervalId) clearInterval(intervalId);
      }, 5000);
    })();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen]);

  /* ---------- Send new queries ---------- */
  const { sendQuery, isPending } = useChatQuery({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: data?.response ?? "Sorry, I couldn't generate a response.",
          queryId: data?.queryId,
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
    // Guard: don't send while RAG is warming or a request is in flight.
    if (isPending || feedbackMessage || ragReady !== true) return;

    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: `q-${Date.now()}`, role: "user", text },
    ]);
    setInput("");
    sendQuery({ query: text });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    submitFeedback({
      queryId: feedbackMessage.queryId,
      rating,
      comment: comment.trim(),
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setFeedbackMessage(null);
  };

  /* ---------- Header status helpers ---------- */
  const statusDot =
    ragReady === true
      ? "bg-emerald-400"
      : ragReady === false
        ? "bg-amber-400"
        : "bg-gray-400";

  const statusLabel =
    ragReady === true
      ? "Online"
      : ragReady === false
        ? "Warming up…"
        : "Connecting…";

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
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot}`}
                />
                {statusLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Feedback View */}
          {feedbackMessage ? (
            <div className="flex flex-1 flex-col overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <h3 className="text-center text-base font-semibold text-text">
                Rate this response
              </h3>
              <p className="mt-1 text-center text-xs text-muted line-clamp-2">
                "{feedbackMessage.text}"
              </p>

              <form
                onSubmit={handleFeedbackSubmit}
                className="mt-6 flex flex-1 flex-col"
              >
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating >= star
                            ? "fill-primary text-primary"
                            : "fill-transparent text-muted/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex-1">
                  <label htmlFor="feedback-comment" className="sr-only">
                    Comment
                  </label>
                  <textarea
                    id="feedback-comment"
                    placeholder="Add an optional comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="h-full min-h-[100px] w-full resize-none rounded-lg border border-border bg-elevated p-3 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={!rating || isSubmittingFeedback}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingFeedback ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackMessage(null)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Chat View */
            <>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {historyLoading && (
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="h-10 w-2/3 animate-pulse rounded-2xl rounded-bl-md bg-surface-light" />
                    </div>
                    <div className="flex justify-end">
                      <div className="h-10 w-1/2 animate-pulse rounded-2xl rounded-br-md bg-surface-light" />
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.role === "user" ? "items-end" : "items-start"
                    }`}
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

                    {m.role === "assistant" && m.queryId && (
                      <button
                        onClick={() => setFeedbackMessage(m)}
                        className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-muted transition hover:text-primary"
                      >
                        <Star className="h-3 w-3" />
                        Rate response
                      </button>
                    )}
                  </div>
                ))}

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

              {/* Warm-up banner (only when not ready) */}
              {ragReady !== true && (
                <div className="flex items-center gap-2 border-t border-border bg-amber-50/60 px-4 py-2.5 text-xs text-amber-700">
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                  <span>
                    {ragReady === false
                      ? "Warming up the assistant — this can take up to a minute on first use."
                      : "Connecting…"}
                  </span>
                </div>
              )}

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 border-t border-border bg-surface p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isPending || ragReady !== true}
                  placeholder={
                    ragReady === true ? "Ask a question..." : "Warming up…"
                  }
                  className="min-w-0 flex-1 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isPending || !input.trim() || ragReady !== true}
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
