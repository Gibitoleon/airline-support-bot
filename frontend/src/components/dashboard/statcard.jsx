
const StatCard = ({ label, value, icon: Icon, accent = false }) => (
  <div className="min-w-0 rounded-xl border border-border bg-surface p-5 shadow-card 
    transition-colors duration-200 hover:border-primary-hover ">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {label}
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-text">
          {value}
        </p>
      </div>
      {Icon && (
        <div
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-lg border",
            accent
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-elevated text-muted",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  </div>
);

export default StatCard;