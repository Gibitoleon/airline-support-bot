
import { useState, useMemo } from "react";
import { invitationData } from "../../../data/data.js";
import InvitationHeader from "./InvitationHeader.jsx";
import InvitationFilters from "./InvitationFilters.jsx";
import InvitationList from "./InvitationList.jsx";
import CreateInvitationModal from "./CreateInvitationModal.jsx";

const InvitationsPanel = () => {
  const [invitations, setInvitations] = useState(invitationData);
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

  const handleCreate = ({ email, role }) => {
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 7);

    setInvitations((prev) => [
      {
        id: Date.now(),
        email,
        role,
        status: "PENDING",
        createdAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      },
      ...prev,
    ]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <InvitationHeader onCreate={() => setModalOpen(true)} />
      <InvitationFilters active={filter} onChange={setFilter} counts={counts} />
      <InvitationList data={filtered} />
      <CreateInvitationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default InvitationsPanel