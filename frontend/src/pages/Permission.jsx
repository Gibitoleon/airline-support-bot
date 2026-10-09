import { useMemo, useState } from "react";
import { Pencil, Plus, Search, ShieldCheck, X } from "lucide-react";
import { permissionsData } from "../../data/permission.data.js";
import PermissionFormModal from "../components/permissions/PermissionFormModal.jsx";
import formatDate from "../utils/dateFormatter.js";
import formatLabel from "../utils/labelFormatter.js";

/* ---------- Mobile card ---------- */
const PermissionCard = ({ permission, onEdit }) => (
  <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-elevated text-muted">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">
            {formatLabel(permission.name)}
          </p>
          <p className="mt-0.5 truncate font-mono text-xs text-muted">
            {permission.name}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEdit(permission)}
        aria-label={`Edit ${permission.name}`}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      <span>Created {formatDate(permission.created_at)}</span>
      <span>·</span>
      <span>Updated {formatDate(permission.updated_at)}</span>
    </div>
  </div>
);

/* ---------- Page ---------- */
const Permissions = () => {
  const [permissions, setPermissions] = useState(permissionsData.permissions);
  const [query, setQuery] = useState("");

  const [formState, setFormState] = useState({
    open: false,
    mode: "create",
    permission: null,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return permissions;
    return permissions.filter((p) => p.name.toLowerCase().includes(q));
  }, [permissions, query]);

  const openCreate = () =>
    setFormState({ open: true, mode: "create", permission: null });

  const openEdit = (permission) =>
    setFormState({ open: true, mode: "edit", permission });

  const closeForm = () =>
    setFormState({ open: false, mode: "create", permission: null });

  const handleSubmit = ({ name }) => {
    const now = new Date().toISOString();

    if (formState.mode === "create") {
      setPermissions((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
          name,
          created_at: now,
          updated_at: now,
        },
      ]);
    } else if (formState.mode === "edit" && formState.permission) {
      setPermissions((prev) =>
        prev.map((p) =>
          p.id === formState.permission.id
            ? { ...p, name, updated_at: now }
            : p
        )
      );
    }

    closeForm();
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
            Permissions
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {hasQuery
              ? `Showing ${filtered.length} of ${permissions.length} permissions`
              : `${permissions.length} total`}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Permission
        </button>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search permissions by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-elevated py-2.5 pl-9 pr-9 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
          <ShieldCheck className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm font-medium text-text">
            {hasQuery ? "No permissions match your search" : "No permissions yet"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {hasQuery
              ? "Try a different search term."
              : "Create your first permission to get started."}
          </p>
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
            >
              <X className="h-3.5 w-3.5" />
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((p) => (
              <PermissionCard
                key={p.id}
                permission={p}
                onEdit={openEdit}
              />
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-xl border border-border bg-surface shadow-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border bg-elevated/40">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                      Permission
                    </th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted lg:table-cell">
                      Created
                    </th>
                    <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted lg:table-cell">
                      Updated
                    </th>
                    <th className="w-20 px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border transition-colors last:border-b-0 hover:bg-surface-light/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-elevated text-muted">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-text">
                              {formatLabel(p.name)}
                            </p>
                            <p className="truncate font-mono text-xs text-muted">
                              {p.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-muted lg:table-cell">
                        {formatDate(p.created_at)}
                      </td>
                      <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-muted lg:table-cell">
                        {formatDate(p.updated_at)}
                      </td>
                      <td className="w-20 py-4 pr-5 text-right">
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          aria-label={`Edit ${p.name}`}
                          title="Edit"
                          className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <PermissionFormModal
        open={formState.open}
        mode={formState.mode}
        permission={formState.permission}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Permissions;