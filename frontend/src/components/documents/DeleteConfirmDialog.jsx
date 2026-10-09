import { useEffect } from "react";
import { Trash2 } from "lucide-react";

const DeleteConfirmDialog = ({ open, doc, onClose, onConfirm }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-document-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-card"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Trash2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h2
              id="delete-document-title"
              className="text-base font-semibold text-text"
            >
              Delete document?
            </h2>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-text">{doc.title}</span> (
              {doc.document_id}) will be removed from the knowledge base.
            </p>
            <p className="mt-2 text-xs text-muted">
              Backend deletion is not wired up yet. Confirming here will not
              actually delete anything.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(doc)}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;