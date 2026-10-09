import { Eye, Trash2, ChevronRight } from "lucide-react";
import Badge from "./Badge.jsx";
import formatLabel from "../../utils/labelFormatter.js";
import formatDate from "../../utils/dateFormatter.js";
import {
  DOCUMENT_STATUS_STYLES,
  DOCUMENT_ACCESS_STYLES,
} from "../../../data/document.data.js";

const DocumentCard = ({ doc, onOpen, onDelete }) => (
  <div
    onClick={() => onOpen(doc)}
    className="group flex cursor-pointer flex-col rounded-xl border border-border bg-surface shadow-card transition hover:border-primary/30"
  >
    <div className="flex-1 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium text-text">
            {doc.title}
          </p>
          <p className="mt-1 truncate font-mono text-xs text-muted">
            {doc.document_id}
          </p>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge
          styles={DOCUMENT_STATUS_STYLES[doc.status]}
          label={doc.status.toLowerCase()}
        />
        <Badge
          styles={DOCUMENT_ACCESS_STYLES[doc.access]}
          label={doc.access.toLowerCase()}
        />
      </div>

      <div className="mt-4 space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted/70">Domain</span>
          <span className="truncate text-text">{formatLabel(doc.domain)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted/70">Type</span>
          <span className="truncate text-text">
            {formatLabel(doc.document_type)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted/70">Added</span>
          <span className="text-text">{formatDate(doc.created_at)}</span>
        </div>
      </div>
    </div>

    <div
      className="flex items-center justify-end gap-1 border-t border-border px-3 py-2"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onOpen(doc)}
        aria-label="View document"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted transition hover:bg-primary/10 hover:text-primary"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </button>
      <button
        type="button"
        onClick={() => onDelete(doc)}
        aria-label="Delete document"
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted transition hover:bg-primary/10 hover:text-primary"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  </div>
);

export default DocumentCard;