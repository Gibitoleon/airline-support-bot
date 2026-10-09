import { useMemo, useState } from "react";
import { Plus, Search, UsersRound, X } from "lucide-react";
import {
  groupsData,
  groupPermissionsData,
  allPermissionsData,
  groupUsersData,
} from "../../data/group.data.js";
import GroupCard from "../components/groups/GroupCard.jsx";
import GroupFormModal from "../components/groups/GroupFormModal.jsx";
import GroupDetail from "../components/groups/GroupDetails.jsx";

const Groups = () => {
  const [groups, setGroups] = useState(groupsData.groups);
  const [permissions, setPermissions] = useState(
    groupPermissionsData.permissions
  );
  const [query, setQuery] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [formState, setFormState] = useState({
    open: false,
    mode: "create",
    group: null,
  });

  const selectedGroup =
    groups.find((g) => g.id === selectedGroupId) ?? null;

  const selectedPermissions = useMemo(
    () => permissions.filter((p) => p.group_id === selectedGroupId),
    [permissions, selectedGroupId]
  );

  const selectedUsers = useMemo(
    () => (selectedGroupId ? groupUsersData[selectedGroupId] ?? [] : []),
    [selectedGroupId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => g.name.toLowerCase().includes(q));
  }, [groups, query]);

  const openCreate = () =>
    setFormState({ open: true, mode: "create", group: null });

  const openEdit = (group) =>
    setFormState({ open: true, mode: "edit", group });

  const closeForm = () =>
    setFormState({ open: false, mode: "create", group: null });

  const handleFormSubmit = ({ name }) => {
    const now = new Date().toISOString();

    if (formState.mode === "create") {
      setGroups((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((g) => g.id)) + 1,
          name,
          created_at: now,
          updated_at: now,
        },
      ]);
    } else if (formState.mode === "edit" && formState.group) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === formState.group.id ? { ...g, name, updated_at: now } : g
        )
      );
    }

    closeForm();
  };

  /* ---------- Permission actions ---------- */
  const handleAddPermission = (permissionId) => {
    if (!selectedGroupId) return;
    const permission = allPermissionsData.find((p) => p.id === permissionId);
    if (!permission) return;

    const now = new Date().toISOString();
    setPermissions((prev) => [
      ...prev,
      {
        group_id: selectedGroupId,
        permission_id: permission.id,
        created_at: now,
        updated_at: now,
        permission,
      },
    ]);
  };

  const handleRemovePermission = (permissionId) => {
    if (!selectedGroupId) return;
    setPermissions((prev) =>
      prev.filter(
        (p) =>
          !(
            p.group_id === selectedGroupId &&
            p.permission_id === permissionId
          )
      )
    );
  };

  /* ---------- Detail view ---------- */
  if (selectedGroup) {
    return (
      <>
        <GroupDetail
          group={selectedGroup}
          permissions={selectedPermissions}
          allPermissions={allPermissionsData}
          users={selectedUsers}
          onBack={() => setSelectedGroupId(null)}
          onAddPermission={handleAddPermission}
          onRemovePermission={handleRemovePermission}
          onEdit={openEdit}
        />

        <GroupFormModal
          open={formState.open}
          mode={formState.mode}
          group={formState.group}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
        />
      </>
    );
  }

  /* ---------- List view ---------- */
  const hasQuery = query.trim().length > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-text lg:text-3xl">
            Groups
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {hasQuery
              ? `Showing ${filtered.length} of ${groups.length} groups`
              : `${groups.length} total`}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Group
        </button>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search groups by name..."
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

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
          <UsersRound className="mx-auto h-8 w-8 text-muted" />
          <p className="mt-3 text-sm font-medium text-text">
            {hasQuery ? "No groups match your search" : "No groups yet"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {hasQuery
              ? "Try a different search term."
              : "Create your first group to get started."}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onOpen={(g) => setSelectedGroupId(g.id)}
            
            />
          ))}
        </div>
      )}

      <GroupFormModal
        open={formState.open}
        mode={formState.mode}
        group={formState.group}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Groups;