import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";

import RoleChip from "../chips/RoleChip.jsx";
import GroupChip from "../chips/GroupChip.jsx";
import AddToGroup from "./AddToGroup";
import formatDate from "../../utils/dateFormatter.js";
import useStaffUsers from "../../customhooks/useStaffUsers.js";
import useUserGroups from "../../customhooks/useUserGroups.js";
import useGroups from "../../customhooks/useGroup.js";

/* ---------- Loading skeleton ---------- */
const UserDetailSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-5 w-32 rounded bg-surface-light" />
    <div className="h-40 rounded-xl border border-border bg-surface" />
    <div className="h-64 rounded-xl border border-border bg-surface" />
  </div>
);

/* ---------- Error ---------- */
const UserDetailError = ({ message, onRetry, onBack }) => (
  <div className="space-y-6">
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to users
    </button>

    <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
      <AlertCircle className="mx-auto h-8 w-8 text-primary" />
      <p className="mt-3 text-sm font-medium text-text">Failed to load user</p>
      <p className="mt-1 text-sm text-muted">
        {message || "Something went wrong. Please try again."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover"
      >
        Retry
      </button>
    </div>
  </div>
);

/* ---------- Not found ---------- */
const UserNotFound = ({ userId, onBack }) => (
  <div className="space-y-6">
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to users
    </button>

    <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
      <AlertCircle className="mx-auto h-8 w-8 text-primary" />
      <p className="mt-3 text-sm font-medium text-text">User not found</p>
      <p className="mt-1 text-sm text-muted">
        No user matches the ID{" "}
        <span className="font-mono text-text">{userId}</span>.
      </p>
    </div>
  </div>
);

/* ---------- Main component ---------- */
const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: users = [], isLoading: usersLoading } = useStaffUsers();

  const {
    data: userGroups = [],
    isLoading: groupsLoading,
    isError,
    error,
    refetch,
  } = useUserGroups(userId);

  // Full group catalog — real API data
  const { data: allGroups = [] } = useGroups();

  const user = users.find((u) => String(u.id) === String(userId));
  const goBack = () => navigate("/admin/users");

  if (usersLoading || groupsLoading) return <UserDetailSkeleton />;

  if (isError) {
    return (
      <UserDetailError
        message={error?.response?.data?.message}
        onRetry={refetch}
        onBack={goBack}
      />
    );
  }

  if (!user) return <UserNotFound userId={userId} onBack={goBack} />;

  /* Computed */
  const groupIds = new Set(userGroups.map((ug) => ug.group.id));
  const availableGroups = allGroups.filter((g) => !groupIds.has(g.id));

  return (
    <div className="space-y-6">
      {/* Back + heading */}
      <div>
        <button
          type="button"
          onClick={goBack}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </button>

        <h2 className="text-base font-semibold text-text">User Details</h2>
        <p className="mt-1 text-sm text-muted">
          Manage the groups this user belongs to.
        </p>
      </div>

      {/* User info */}
      <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Email
            </p>
            <p className="mt-1.5 break-all text-sm font-medium text-text">
              {user.email}
            </p>
          </div>
          <RoleChip role={user.role} />
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Joined
          </p>
          <p className="mt-1.5 text-sm text-text">
            {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-text">Groups</h3>
          <span className="text-xs text-muted">
            {userGroups.length} of {allGroups.length}
          </span>
        </div>

        {userGroups.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-6 text-center shadow-card">
            <p className="text-sm text-muted">
              This user is not in any groups yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {userGroups.map((ug) => (
              <GroupChip
                key={ug.group_id}
                group={ug.group}
                onRemove={() => {
                  // TODO: DELETE /usergroups when ready
                  console.warn("[Remove from group]", ug.group_id);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add to group */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-text">Add to Group</h3>
        <AddToGroup
          availableGroups={availableGroups}
          onAdd={(groupId) => {
            // TODO: POST /usergroups when ready
            console.warn("[Add to group]", groupId);
          }}
        />
      </div>
    </div>
  );
};

export default UserDetail;
