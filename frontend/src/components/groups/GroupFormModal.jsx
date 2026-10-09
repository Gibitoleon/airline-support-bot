import { useEffect, useRef, useState } from "react";
import { Plus, Save, X } from "lucide-react";
import formatDate from "../../utils/dateFormatter.js";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-70";

const MODE_CONFIG = {
  create: { title: "Create Group", subtitle: "Add a new group to the system.", submit: "Create Group", icon: Plus },
  edit:   { title: "Edit Group",   subtitle: "Update the group name.",        submit: "Save Changes", icon: Save },
  view:   { title: "Group Details", subtitle: "Group information.",            submit: null,           icon: null },
};

const GroupFormModal = ({ open, mode = "create", group, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setName(group?.name ?? "");

    const isView = mode === "view";
    let focusTimer;
    if (!isView) {
      focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    }

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, mode, group, onClose]);

  if (!open) return null;

  const config = MODE_CONFIG[mode];
  const isView = mode === "view";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit({ name: trimmed });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-form-title"
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-card sm:max-w-md sm:rounded-xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="group-form-title"
              className="text-base font-semibold text-text"
            >
              {config.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{config.subtitle}</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="group-name"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Group Name
            </label>
            <input
              ref={inputRef}
              id="group-name"
              type="text"
              required={!isView}
              disabled={isView}
              placeholder="e.g. Operations"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          {isView && group && (
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Created
                </p>
                <p className="text-sm text-text">{formatDate(group.created_at)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Updated
                </p>
                <p className="text-sm text-text">{formatDate(group.updated_at)}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text sm:w-auto"
            >
              {isView ? "Close" : "Cancel"}
            </button>

            {!isView && (
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
              >
                <config.icon className="h-4 w-4" />
                {config.submit}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupFormModal;