import InvitationCard from "./InvitationCard.jsx";
import InvitationRow from "./InvitationRow";

const INVITATION_COLUMNS = ["Email", "Role", "Status", "Created", "Expires"];

const InvitationList = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center shadow-card">
        <p className="text-sm font-medium text-text">No invitations found</p>
        <p className="mt-1 text-sm text-muted">
          Try a different filter or create a new invitation.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {data.map((inv) => (
          <InvitationCard key={inv.id} invitation={inv} />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border bg-surface shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-elevated/40">
                {INVITATION_COLUMNS.map((c) => (
                  <th
                    key={c}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((inv) => (
                <InvitationRow key={inv.id} invitation={inv} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InvitationList