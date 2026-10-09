import { Plus } from "lucide-react";
const InvitationHeader = ({ onCreate }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-muted">
      Invitations expire 7 days after they&apos;re sent.
    </p>

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
export default InvitationHeader