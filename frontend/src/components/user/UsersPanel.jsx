import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import UsersList from "./UsersList.jsx";
import useStaffUsers from "../../customhooks/useStaffUsers.js";

/* ---------- Loading skeleton ---------- */
const UsersSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="h-20 rounded-xl border border-border bg-surface"
      />
    ))}
  </div>
);

/* ---------- Error state ---------- */
const UsersError = ({ message, onRetry }) => (
  <div className="rounded-xl border border-primary/30 bg-surface p-10 text-center shadow-card">
    <AlertCircle className="mx-auto h-8 w-8 text-primary" />
    <p className="mt-3 text-sm font-medium text-text">
      Failed to load users
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

const UsersPanel = () => {
  const navigate = useNavigate();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useStaffUsers();

  if (isLoading) return <UsersSkeleton />;

  if (isError) {
    return (
      <UsersError
        message={error?.response?.data?.message}
        onRetry={refetch}
      />
    );
  }

  return (
    <UsersList
      users={users}
      onSelect={(id) => navigate(`/admin/users/${id}`)}
    />
  );
};

export default UsersPanel;