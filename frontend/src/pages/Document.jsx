import { useMemo, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { documentMetadata } from "../../data/document.data.js";
import FilterBar from "../components/documents/FilterBar.jsx";
import DocumentCard from "../components/documents/DocumentCard.jsx";
import UploadDocumentModal from "../components/documents/UploadDocumentModal.jsx";
import DeleteConfirmDialog from "../components/documents/DeleteConfirmDialog.jsx";
import DocumentDetails from "../components/documents/DocumentDetails.jsx";

const Documents = () => {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [access, setAccess] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  const hasActiveFilters =
    query !== "" ||
    domain !== "ALL" ||
    type !== "ALL" ||
    access !== "ALL" ||
    status !== "ALL";

  const clearFilters = () => {
    setQuery("");
    setDomain("ALL");
    setType("ALL");
    setAccess("ALL");
    setStatus("ALL");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return documentMetadata.filter((d) => {
      if (domain !== "ALL" && d.domain !== domain) return false;
      if (type !== "ALL" && d.document_type !== type) return false;
      if (access !== "ALL" && d.access !== access) return false;
      if (status !== "ALL" && d.status !== status) return false;

      if (q) {
        const haystack =
          `${d.title} ${d.document_id} ${d.file_name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, domain, type, access, status]);

  const handleDeleteConfirm = (doc) => {
    console.warn("[Delete Document] Backend integration pending:", doc);
    setDeleteTarget(null);
  };

  // Detail view
  if (selectedDocumentId) {
    return (
      <DocumentDetails
        documentId={selectedDocumentId}
        onBack={() => setSelectedDocumentId(null)}
      />
    );
  }

  // List view
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
            Documents
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {hasActiveFilters
              ? `Showing ${filtered.length} of ${documentMetadata.length} documents`
              : `Manage knowledge base documents · ${documentMetadata.length} total`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-auto"
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </header>

      <FilterBar
        query={query}
        setQuery={setQuery}
        domain={domain}
        setDomain={setDomain}
        type={type}
        setType={setType}
        access={access}
        setAccess={setAccess}
        status={status}
        setStatus={setStatus}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
          <FileText className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm font-medium text-text">
            No documents found
          </p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onOpen={() => setSelectedDocumentId(doc.document_id)}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <UploadDocumentModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

      <DeleteConfirmDialog
        open={!!deleteTarget}
        doc={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Documents;