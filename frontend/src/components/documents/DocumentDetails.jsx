import { useMemo } from "react";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";
import {
  documentMetadata,
  documentContentById,
  DOCUMENT_STATUS_STYLES,
  DOCUMENT_ACCESS_STYLES,
} from "../../../data/document.data.js"
import Badge from "./Badge.jsx";
import formatDate from "../../utils/dateFormatter.js";
import formatLabel from "../../utils/labelFormatter.js";

/* ---------- Tiny inline markdown renderer ---------- */
const renderInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const MarkdownView = ({ content }) => {
  const lines = content.split("\n");
  const blocks = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "ul", items: listBuffer });
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed === "" || trimmed === "---") {
      if (trimmed === "---") blocks.push({ type: "hr", key: idx });
      return;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4), key: idx });
      return;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3), key: idx });
      return;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2), key: idx });
      return;
    }

    blocks.push({ type: "p", text: trimmed, key: idx });
  });

  flushList();

  return (
    <div className="space-y-4">
      {blocks.map((b) => {
        switch (b.type) {
          case "h1":
            return (
              <h1
                key={b.key}
                className="mt-2 text-2xl font-semibold tracking-tight text-text"
              >
                {b.text}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={b.key}
                className="mt-6 text-lg font-semibold text-text first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={b.key}
                className="mt-4 text-base font-semibold text-text"
              >
                {b.text}
              </h3>
            );
          case "hr":
            return <hr key={b.key} className="border-border" />;
          case "ul":
            return (
              <ul key={b.key} className="space-y-1.5">
                {b.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "p":
          default:
            return (
              <p key={b.key} className="text-sm leading-relaxed text-muted">
                {renderInline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
};

/* ---------- Meta row ---------- */
const MetaItem = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-xs font-medium uppercase tracking-wider text-muted">
      {label}
    </p>
    <div className="mt-1.5 text-sm text-text">{children}</div>
  </div>
);

/* ---------- Page ---------- */
const DocumentDetails = ({ documentId, onBack }) => {
  const doc = useMemo(
    () => documentMetadata.find((d) => d.document_id === documentId),
    [documentId]
  );

  const content = documentContentById[documentId];

  if (!doc) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to documents
        </button>

        <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
          <AlertTriangle className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 text-sm font-medium text-text">
            Document not found
          </p>
          <p className="mt-1 text-sm text-muted">
            No document matches the ID{" "}
            <span className="font-mono text-text">{documentId}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to documents
      </button>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-md border border-border bg-elevated px-2 py-0.5 font-mono text-xs font-medium text-muted">
            {doc.document_id}
          </span>
          <Badge
            styles={DOCUMENT_STATUS_STYLES[doc.status]}
            label={doc.status.toLowerCase()}
          />
          <Badge
            styles={DOCUMENT_ACCESS_STYLES[doc.access]}
            label={doc.access.toLowerCase()}
          />
        </div>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text lg:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {formatLabel(doc.domain)} · {formatLabel(doc.document_type)}
        </p>
      </header>

      <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
        <h2 className="mb-5 text-base font-semibold text-text">Metadata</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MetaItem label="Domain">{formatLabel(doc.domain)}</MetaItem>
          <MetaItem label="Category">{formatLabel(doc.category)}</MetaItem>
          <MetaItem label="Document Type">
            {formatLabel(doc.document_type)}
          </MetaItem>
          <MetaItem label="Origin">{formatLabel(doc.origin)}</MetaItem>
          <MetaItem label="Language">{doc.language}</MetaItem>
          <MetaItem label="Access Scope">
            <Badge
              styles={DOCUMENT_ACCESS_STYLES[doc.access]}
              label={doc.access.toLowerCase()}
            />
          </MetaItem>

          <MetaItem label="Applicable To">
            <div className="flex flex-wrap gap-1.5">
              {doc.applicable_to.map((a) => (
                <span
                  key={a}
                  className="inline-flex rounded-md border border-border bg-elevated px-2 py-0.5 text-xs font-medium text-muted"
                >
                  {formatLabel(a)}
                </span>
              ))}
            </div>
          </MetaItem>

          <MetaItem label="File Name">
            <span className="break-all font-mono text-xs">{doc.file_name}</span>
          </MetaItem>

          <MetaItem label="Status">
            <Badge
              styles={DOCUMENT_STATUS_STYLES[doc.status]}
              label={doc.status.toLowerCase()}
            />
          </MetaItem>

          <MetaItem label="Created">{formatDate(doc.created_at)}</MetaItem>
          <MetaItem label="Updated">{formatDate(doc.updated_at)}</MetaItem>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-text">Content</h2>
          <span className="text-xs text-muted">Markdown</span>
        </div>

        {content ? (
          <MarkdownView content={content} />
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-elevated/40 p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-medium text-text">
              Content not loaded
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted">
              Wire this section to your document-content endpoint to render the
              full markdown here.
            </p>
            <p className="mt-3 font-mono text-xs text-muted">
              GET /documents/{doc.document_id}/content
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;