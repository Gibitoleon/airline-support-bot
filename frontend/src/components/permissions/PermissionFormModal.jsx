import { useEffect, useRef, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30";

const MODE_CONFIG = {
  create: {
    title: "Create Permission",
    subtitle: "Add a new permission to the catalog.",
    submit: "Create Permission",
    icon: Plus,
  },
  edit: {
    title: "Edit Permission",
    subtitle: "Rename this permission.",
    submit: "Save Changes",
    icon: Save,
  },
};

const PermissionFormModal = ({ open, mode = "create", permission, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setName(permission?.name ?? "");

    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, permission, onClose]);

  if (!open) return null;

  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim().toUpperCase().replace(/\s+/g, "_");
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
        aria-labelledby="permission-form-title"
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-card sm:max-w-md sm:rounded-xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="permission-form-title"
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
              htmlFor="permission-name"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Permission Name
            </label>
            <input
              ref={inputRef}
              id="permission-name"
              type="text"
              required
              placeholder="e.g. VIEW_REPORTS"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${FIELD_CLASS} font-mono uppercase`}
            />
            <p className="text-xs text-muted">
              Use UPPER_SNAKE_CASE. Spaces are converted to underscores.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
            >
              <Icon className="h-4 w-4" />
              {config.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionFormModal;