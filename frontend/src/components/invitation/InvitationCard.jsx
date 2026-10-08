
import formatDate from "../../utils/dateFormatter.js";
import StatusBadge from "./StatusBadge.jsx";
import RoleChip from "../chips/RoleChip.jsx";

const InvitationCard = ({ invitation }) => {
  const { email, role, status, createdAt, expiresAt } = invitation;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className="flex  items-start justify-between gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-text">
          {email}
        </p>
        <StatusBadge status={status} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
        <RoleChip role={role} />
        <span>·</span>
         <span>Created {formatDate(createdAt, { year: "numeric" })}</span>
        <span>·</span>
        <span>Expires {formatDate(expiresAt,{ year: "numeric" })}</span>
      </div>
    </div>
  );
};
export default InvitationCard
