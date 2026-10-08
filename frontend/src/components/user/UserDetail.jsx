import { ArrowLeft} from "lucide-react";
import RoleChip from "../chips/RoleChip.jsx";
import formatDate from "../../utils/dateFormatter.js";
import GroupChip from "../chips/GroupChip.jsx";
import AddToGroup from "./AddToGroup";

const UserDetail = ({ user, userGroups, allGroups, onBack, onAdd, onRemove }) => {
  const groupIds = new Set(userGroups.map((g) => g.group.id));
  const availableGroups = allGroups.filter((g) => !groupIds.has(g.id));

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
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
            {formatDate(user.created_at, { year: "numeric"})}
          </p>
        </div>
      </div>

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
                onRemove={() => onRemove(ug.group_id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-text">Add to Group</h3>
        <AddToGroup availableGroups={availableGroups} onAdd={onAdd} />
      </div>
    </div>
  );
};

export default UserDetail;
