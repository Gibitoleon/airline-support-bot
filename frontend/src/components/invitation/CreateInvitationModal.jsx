import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

const ROLE_OPTIONS = [{ value: "Staff", label: "Staff" }];

const CreateInvitationModal = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Staff");
  const emailRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setEmail("");
    setRole("Staff");

    const t = setTimeout(() => emailRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, role });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-invitation-title"
        className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-card sm:max-w-lg sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2
              id="create-invitation-title"
              className="text-base font-semibold text-text sm:text-lg"
            >
              Create Invitation
            </h2>
            <p className="mt-1 text-sm text-muted">
              Send an invitation to join the support portal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-surface-light hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="invite-email"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Email
            </label>
            <input
              ref={emailRef}
              id="invite-email"
              type="email"
              required
              placeholder="name@kenya-airways.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="invite-role"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Role
            </label>
            <select
              id="invite-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value} className="bg-elevated">
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-invitation-form"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateInvitationModal;