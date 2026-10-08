
const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
];
const InvitationFilters = ({ active, onChange, counts }) => (
  <div className="flex flex-wrap items-center gap-2">
    {FILTERS.map((f) => {
      const isActive = active === f.key;
      return (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={[
            "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            isActive
              ? "border-primary/30 bg-primary/10 text-text"
              : "border-border bg-surface text-muted hover:bg-surface-light hover:text-text",
          ].join(" ")}
        >
          <span>{f.label}</span>
          <span
            className={[
              "rounded-full px-1.5 py-0.5 text-xs font-semibold",
              isActive ? "bg-primary/20 text-primary" : "bg-elevated text-muted",
            ].join(" ")}
          >
            {counts[f.key] ?? 0}
          </span>
        </button>
      );
    })}
  </div>
);
export default InvitationFilters