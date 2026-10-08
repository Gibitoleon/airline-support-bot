import { Plus} from "lucide-react";
const InvitationHeader = ({ onCreate }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      <h2 className="text-base font-semibold text-text">Invitations</h2>
      <p className="mt-1 text-sm text-muted">
        Manage invitations sent to users. Invitations expire 7 days after
        they&apos;re sent.
      </p>
    </div>

    <button
      type="button"
      onClick={onCreate}
      className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Create Invitation
    </button>
  </div>
);

export default InvitationHeader;