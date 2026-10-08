
import { Users as UsersIcon } from "lucide-react";
import  RoleChip  from "../chips/RoleChip.jsx";
import  RowChevron from "./RowChevron.jsx";
import  formatDate from "../../utils/dateFormatter.js";

const UserCard = ({ user, groupsCount, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(user.id)}
    aria-label={`View ${user.email}`}
    className="group flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-4 text-left shadow-card transition hover:border-primary/30"
  >
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-text">
          {user.email}
        </p>
        <RoleChip role={user.role} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <UsersIcon className="h-3.5 w-3.5" />
          {groupsCount} {groupsCount === 1 ? "group" : "groups"}
        </span>
        <span>·</span>
        <span>Joined {formatDate(user.created_at, { year: "numeric" })}</span>
      </div>
    </div>

    <RowChevron />
  </button>
);

export default UserCard;