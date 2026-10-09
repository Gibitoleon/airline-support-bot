import { useMemo, useState } from "react";
import { ArrowLeft, Plus, Users as UsersIcon, X } from "lucide-react";
import formatDate from "../../utils/dateFormatter.js";
import formatLabel from "../../utils/labelFormatter.js";

/* ---------- Permission chip (with remove) ---------- */
const PermissionChip = ({ permission, onRemove }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-elevated px-3 py-2.5">
    <span className="min-w-0 flex-1 truncate text-sm font-medium text-text">
      {formatLabel(permission.name)}
    </span>
    <button
      type="button"
      onClick={() => onRemove(permission.id)}
      aria-label={`Remove ${permission.name}`}
      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </div>
);

/* ---------- Add permission row ---------- */
const AddPermission = ({ available, onAdd }) => {
  const [selected, setSelected] = useState("");

  if (available.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-elevated/40 p-4 text-center">
        <p className="text-sm text-muted">
          All available permissions are already assigned to this group.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Number(selected || available[0].id);
    if (!id) return;
    onAdd(id);
    setSelected("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full min-w-0 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30 sm:flex-1"
      >
        {available.map((p) => (
          <option key={p.id} value={p.id} className="bg-elevated">
            {formatLabel(p.name)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
      >
        <Plus className="h-4 w-4" />
        Add Permission
      </button>
    </form>
  );
};

/* ---------- User row (read-only) ---------- */
const UserRow = ({ user }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-elevated px-3 py-2.5">
    <p className="min-w-0 flex-1 truncate text-sm font-medium text-text">
      {user.email}
    </p>
    <span className="shrink-0 font-mono text-xs text-muted">#{user.id}</span>
  </div>
);

/* ---------- Section header ---------- */
const SectionHeader = ({ title, meta }) => (
  <div className="flex items-center justify-between gap-3">
    <h2 className="min-w-0 truncate text-base font-semibold text-text">
      {title}
    </h2>
    <span className="shrink-0 whitespace-nowrap text-xs text-muted">
      {meta}
    </span>
  </div>
);

/* ---------- Page ---------- */
const GroupDetail = ({
  group,
  permissions,
  allPermissions,
  users,
  onBack,
  onAddPermission,
  onRemovePermission,
  onEdit,
}) => {
  const assignedIds = useMemo(
    () => new Set(permissions.map((p) => p.permission.id)),
    [permissions]
  );

  const availablePermissions = allPermissions.filter(
    (p) => !assignedIds.has(p.id)
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to groups
      </button>

      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-semibold tracking-tight text-text lg:text-3xl">
            {group.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Group · Created {formatDate(group.created_at)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEdit(group)}
          className="inline-flex shrink-0 items-center justify-center self-start rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
        >
          Edit
        </button>
      </header>

      {/* Permissions */}
      <section className="space-y-4">
        <SectionHeader
          title="Permissions"
          meta={`${permissions.length} of ${allPermissions.length}`}
        />

        {permissions.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-6 text-center shadow-card">
            <p className="text-sm text-muted">
              No permissions assigned to this group yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {permissions.map((p) => (
              <PermissionChip
                key={p.permission_id}
                permission={p.permission}
                onRemove={onRemovePermission}
              />
            ))}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-text">Add Permission</h3>
          <AddPermission
            available={availablePermissions}
            onAdd={onAddPermission}
          />
        </div>
      </section>

      {/* Users */}
      <section className="space-y-4">
        <SectionHeader
          title="Users"
          meta={
            <span className="inline-flex items-center gap-1.5">
              <UsersIcon className="h-3.5 w-3.5" />
              {users.length} {users.length === 1 ? "member" : "members"}
            </span>
          }
        />

        {users.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-6 text-center shadow-card">
            <p className="text-sm text-muted">
              No users assigned to this group yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <UserRow key={u.user_id} user={u.user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default GroupDetail;