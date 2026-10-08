import UserCard from "./UserCard";
import UserRow from "./UserRow";

const USER_COLUMNS = ["Email", "Role", "Groups", "Joined"];

const UsersList = ({ users, groups, onSelect }) => {
  const groupsCountFor = (userId) =>
    groups.filter((g) => g.user_id === userId).length;

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
        <p className="text-sm font-medium text-text">No users found</p>
        <p className="mt-1 text-sm text-muted">
          Invite someone to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            groupsCount={groupsCountFor(u.id)}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-elevated/40">
                {USER_COLUMNS.map((c) => (
                  <th
                    key={c}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {c}
                  </th>
                ))}
                <th className="w-12 py-3 pr-5">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  groupsCount={groupsCountFor(u.id)}
                  onSelect={onSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersList;