import StatusBadge from "./StatusBadge.jsx";
import RoleChip from "../chips/RoleChip.jsx";
import formatDate from "../../utils/dateFormatter.js";
const InvitationRow = ({ invitation }) => {
  const { email, role, status, createdAt, expiresAt } = invitation;

  return (
    <tr className="border-b border-border transition-colors last:border-b-0 hover:bg-surface-light/40">
      <td className="px-5 py-4">
        <span className="block truncate text-sm font-medium text-text">{email}</span>
      </td>
      <td className="px-5 py-4">
        <RoleChip role={role} />
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={status} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
        {formatDate(createdAt,{year: "numeric"})}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
        {formatDate(expiresAt,{year: "numeric"})}
      </td>
    </tr>
  );
};

export default InvitationRow