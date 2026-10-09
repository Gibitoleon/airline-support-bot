import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import formatLabel from "../../utils/labelFormatter.js";
import {
  DOCUMENT_DOMAIN_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  DOCUMENT_ACCESS_OPTIONS,
} from "../../../data/document.data.js";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30";

const buildInitialForm = () => ({
  title: "",
  domain: DOCUMENT_DOMAIN_OPTIONS[0],
  document_type: DOCUMENT_TYPE_OPTIONS[0],
  access: DOCUMENT_ACCESS_OPTIONS[0],
  file: null,
});

const UploadDocumentModal = ({ open, onClose }) => {
  const [form, setForm] = useState(buildInitialForm);

  useEffect(() => {
    if (!open) return;

    setForm(buildInitialForm());

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(
      "[Upload Document] Backend integration pending. Submitted:",
      form
    );
    onClose();
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
        aria-labelledby="upload-document-title"
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-card sm:max-w-md sm:rounded-xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="upload-document-title"
              className="text-base font-semibold text-text"
            >
              Upload Document
            </h2>
            <p className="mt-1 text-sm text-muted">
              Add a new document to the knowledge base.
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="upload-title"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Title
            </label>
            <input
              id="upload-title"
              type="text"
              required
              placeholder="e.g. Baggage Allowance"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={FIELD_CLASS}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="upload-domain"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              Domain
            </label>
            <select
              id="upload-domain"
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className={FIELD_CLASS}
            >
              {DOCUMENT_DOMAIN_OPTIONS.map((d) => (
                <option key={d} value={d} className="bg-elevated">
                  {formatLabel(d)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="upload-type"
                className="block text-xs font-medium uppercase tracking-wider text-muted"
              >
                Type
              </label>
              <select
                id="upload-type"
                value={form.document_type}
                onChange={(e) =>
                  setForm({ ...form, document_type: e.target.value })
                }
                className={FIELD_CLASS}
              >
                {DOCUMENT_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t} className="bg-elevated">
                    {formatLabel(t)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="upload-access"
                className="block text-xs font-medium uppercase tracking-wider text-muted"
              >
                Access
              </label>
              <select
                id="upload-access"
                value={form.access}
                onChange={(e) => setForm({ ...form, access: e.target.value })}
                className={FIELD_CLASS}
              >
                {DOCUMENT_ACCESS_OPTIONS.map((a) => (
                  <option key={a} value={a} className="bg-elevated">
                    {formatLabel(a)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="upload-file"
              className="block text-xs font-medium uppercase tracking-wider text-muted"
            >
              File (.md)
            </label>
            <input
              id="upload-file"
              type="file"
              accept=".md,.markdown,text/markdown"
              onChange={(e) =>
                setForm({ ...form, file: e.target.files?.[0] ?? null })
              }
              className="block w-full cursor-pointer rounded-lg border border-border bg-elevated text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-l-lg file:border-0 file:bg-surface-light file:px-3 file:py-2.5 file:text-sm file:font-medium file:text-text hover:file:bg-surface-light/80"
            />
          </div>

          <p className="text-xs text-muted">
            Backend upload is not wired up yet. Submitting will not create a
            document.
          </p>

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
              <Upload className="h-4 w-4" />
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentModal;