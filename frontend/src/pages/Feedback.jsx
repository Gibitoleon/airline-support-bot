import { Star, MessageSquareQuote } from "lucide-react";
import { feedbackData } from "../../data/feedback.data.js";

/* ---------- Helpers ---------- */
const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/* ---------- Rating stars ---------- */
const RatingStars = ({ rating, size = "md" }) => {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={[
            sizeClass,
            n <= rating
              ? "fill-primary text-primary"
              : "fill-transparent text-muted/40",
          ].join(" ")}
        />
      ))}
    </div>
  );
};

/* ---------- Feedback card ---------- */
const FeedbackCard = ({ feedback }) => {
  const { rating, comment, createdAt, query } = feedback;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card sm:p-6">
      {/* Top row — rating + date */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <span className="text-sm font-medium text-text">{rating}.0</span>
        </div>
        <span className="text-xs text-muted">
          {formatDateTime(createdAt)}
        </span>
      </div>

      {/* Query */}
      <div className="mt-5 space-y-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Question
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-text">
            {query.question}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Response
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {query.response}
          </p>
        </div>
      </div>

      {/* Comment */}
      {comment && (
        <div className="mt-5 flex items-start gap-3 rounded-lg border border-border bg-elevated px-4 py-3">
          <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="min-w-0 text-sm italic leading-relaxed text-text">
            {comment}
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------- Page ---------- */
const Feedback = () => {
  const feedbacks = feedbackData.Feedbacks;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
          Feedback
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {feedbacks.length} {feedbacks.length === 1 ? "entry" : "entries"} from
          users
        </p>
      </header>

      {/* Empty state */}
      {feedbacks.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
          <MessageSquareQuote className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm font-medium text-text">No feedback yet</p>
          <p className="mt-1 text-sm text-muted">
            Feedback submitted by users will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <FeedbackCard key={f.id} feedback={f} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;