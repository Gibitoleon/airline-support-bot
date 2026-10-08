import { Users as UsersIcon } from "lucide-react";
import RowChevron from "./RowChevron";
import RoleChip from "../chips/RoleChip.jsx";
import formatDate from "../../utils/dateFormatter.js";

const UserRow = ({ user, groupsCount, onSelect }) => (
  <tr
    onClick={() => onSelect(user.id)}
    className="group cursor-pointer border-b border-border transition-colors last:border-b-0 hover:bg-surface-light/40"
  >
    <td className="px-5 py-4">
      <span className="block truncate text-sm font-medium text-text">
        {user.email}
      </span>
    </td>
    <td className="px-5 py-4">
      <RoleChip role={user.role} />
    </td>
    <td className="px-5 py-4">
      <span className="inline-flex items-center gap-1.5 text-sm text-muted">
        <UsersIcon className="h-4 w-4" />
        {groupsCount}
      </span>
    </td>
    <td className="whitespace-nowrap px-5 py-4 text-sm text-muted">
      {formatDate(user.created_at, { year: "numeric" })}
    </td>
    <td className="w-12 py-4 pr-5 text-right">
      <span className="inline-flex">
        <RowChevron />
      </span>
    </td>
  </tr>
);

export default UserRow;