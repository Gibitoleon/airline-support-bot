
const RoleChip = ({ role }) => (
  <span className="inline-flex rounded-md border border-border bg-elevated px-2 py-0.5 text-xs font-medium text-muted">
    {typeof role === "string" ? role : role?.name ?? "—"}
  </span>
);
export default RoleChip;
