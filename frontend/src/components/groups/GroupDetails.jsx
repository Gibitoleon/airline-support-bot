import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
  Plus,
  Users as UsersIcon,
  X,
} from "lucide-react";

import useGroups from "../../customhooks/useGroup.js";
import useGroupPermissions from "../../customhooks/useGroupPermissions.js";
import useGroupUsers from "../../customhooks/useGroupUsers.js";
import usePermissions from "../../customhooks/usePermission.js";
import useAddGroupPermission from "../../customhooks/useAddPermissions.js";
import useRemoveGroupPermission from "../../customhooks/useRemovePermissions.js";
import formatDate from "../../utils/dateFormatter.js";
import formatLabel from "../../utils/labelFormatter.js";

/* ---------- Permission chip ---------- */
const PermissionChip = ({ permission, onRemove, disabled }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-elevated px-3 py-2.5">
    <span className="min-w-0 flex-1 truncate text-sm font-medium text-text">
      {formatLabel(permission.name)}
    </span>
    <button
      type="button"
      onClick={() => onRemove(permission.id)}
      disabled={disabled}
      aria-label={`Remove ${permission.name}`}
      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </div>
);

/* ---------- Add permission ---------- */
const AddPermission = ({ available, onAdd, isPending }) => {
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
    if (isPending) return;
    const id = Number(selected || available[0].id);
    if (!id) return;
    onAdd(id);
    setSelected("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <select
        value={selected}
        disabled={isPending}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full min-w-0 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
      >
        {available.map((p) => (
          <option key={p.id} value={p.id} className="bg-elevated">
            {formatLabel(p.name)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add Permission
          </>
        )}
      </button>
    </form>
  );
};

/* ---------- User row ---------- */
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

/* ---------- Section skeleton ---------- */
const SectionSkeleton = () => (
  <div className="animate-pulse space-y-2">
    {[0, 1].map((i) => (
      <div
        key={i}
        className="h-12 rounded-lg border border-border bg-surface"
      />
    ))}
  </div>
);

/* ---------- Not found ---------- */
const NotFound = ({ groupId, onBack }) => (
  <div className="space-y-6">
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to groups
    </button>

    <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
      <AlertCircle className="mx-auto h-8 w-8 text-primary" />
      <p className="mt-3 text-sm font-medium text-text">Group not found</p>
      <p className="mt-1 text-sm text-muted">
        No group matches the ID{" "}
        <span className="font-mono text-text">{groupId}</span>.
      </p>
    </div>
  </div>
);

/* ---------- Main ---------- */
const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { data: groups = [], isLoading: groupsLoading } = useGroups();

  const {
    data: permissions = [],
    isLoading: permsLoading,
    isError: permsError,
    refetch: refetchPerms,
  } = useGroupPermissions(groupId);

  const { data: users = [], isLoading: usersLoading } = useGroupUsers(groupId);

  const { data: allPermissions = [] } = usePermissions();

  const { addGroupPermission, isPending: isAdding } = useAddGroupPermission();
  const { removeGroupPermission, isPending: isRemoving } =
    useRemoveGroupPermission();

  const group = useMemo(
    () => groups.find((g) => String(g.id) === String(groupId)),
    [groups, groupId],
  );

  const assignedIds = useMemo(
    () => new Set(permissions.map((p) => p.permission.id)),
    [permissions],
  );

  const availablePermissions = allPermissions.filter(
    (p) => !assignedIds.has(p.id),
  );

  const goBack = () => navigate("/admin/groups");

  /* ---------- Permission actions ---------- */
  const handleAddPermission = (permissionId) => {
    addGroupPermission({ groupId, permissionId });
  };

  const handleRemovePermission = (permissionId) => {
    removeGroupPermission({ groupId, permissionId });
  };

  /* ---------- Loading ---------- */
  if (groupsLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-5 w-32 rounded bg-surface-light" />
        <div className="h-32 rounded-xl border border-border bg-surface" />
        <div className="h-64 rounded-xl border border-border bg-surface" />
      </div>
    );
  }

  /* ---------- Not found ---------- */
  if (!group) return <NotFound groupId={groupId} onBack={goBack} />;

  /* ---------- Main render ---------- */
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back */}
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to groups
      </button>

      {/* Header */}
      <header>
        <h1 className="break-words text-2xl font-semibold tracking-tight text-text lg:text-3xl">
          {group.name}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Group · Created {formatDate(group.created_at)}
        </p>
      </header>

      {/* Permissions */}
      <section className="space-y-4">
        <SectionHeader
          title="Permissions"
          meta={`${permissions.length} of ${allPermissions.length}`}
        />

        {permsLoading ? (
          <SectionSkeleton />
        ) : permsError ? (
          <div className="rounded-xl border border-primary/30 bg-surface p-6 text-center shadow-card">
            <AlertCircle className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-2 text-sm font-medium text-text">
              Failed to load permissions
            </p>
            <button
              type="button"
              onClick={refetchPerms}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
            >
              Retry
            </button>
          </div>
        ) : permissions.length === 0 ? (
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
                onRemove={handleRemovePermission}
                disabled={isRemoving}
              />
            ))}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold text-text">Add Permission</h3>
          <AddPermission
            available={availablePermissions}
            onAdd={handleAddPermission}
            isPending={isAdding}
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

        {usersLoading ? (
          <SectionSkeleton />
        ) : users.length === 0 ? (
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
