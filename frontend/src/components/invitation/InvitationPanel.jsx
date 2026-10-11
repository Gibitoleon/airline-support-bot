import { useState, useMemo } from "react";
import { AlertCircle } from "lucide-react";

import InvitationHeader from "./InvitationHeader.jsx";
import InvitationFilters from "./InvitationFilters.jsx";
import InvitationList from "./InvitationList.jsx";
import CreateInvitationModal from "./CreateInvitationModal.jsx";
import useInvitations from "../../customhooks/useInvitation.js";

/* ---------- Loading skeleton ---------- */
const InvitationsSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-20 rounded-xl border border-border bg-surface"
      />
    ))}
  </div>
);

/* ---------- Error state ---------- */
const InvitationsError = ({ message, onRetry }) => (
  <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
    <AlertCircle className="mx-auto h-8 w-8 text-primary" />
    <p className="mt-3 text-sm font-medium text-text">
      Failed to load invitations
    </p>
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
);

const InvitationsPanel = () => {
  const {
    data: invitations = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useInvitations();

  const [filter, setFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);

  const counts = useMemo(
    () => ({
      ALL: invitations.length,
      PENDING: invitations.filter((i) => i.status === "PENDING").length,
      ACCEPTED: invitations.filter((i) => i.status === "ACCEPTED").length,
    }),
    [invitations]
  );

  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? invitations
        : invitations.filter((i) => i.status === filter),
    [invitations, filter]
  );

  if (isLoading) {
    return (
      <div className="space-y-5 sm:space-y-6">
        <InvitationHeader onCreate={() => setModalOpen(true)} />
        <InvitationsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-5 sm:space-y-6">
        <InvitationHeader onCreate={() => setModalOpen(true)} />
        <InvitationsError
          message={error?.response?.data?.message}
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <InvitationHeader onCreate={() => setModalOpen(true)} />

      <InvitationFilters
        active={filter}
        onChange={setFilter}
        counts={counts}
      />

      <InvitationList data={filtered} />

      {/* Modal owns the create mutation */}
      <CreateInvitationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default InvitationsPanel;