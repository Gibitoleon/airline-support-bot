const STATUS_STYLES = {
  PENDING: {
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    dot: "bg-amber-400",
  },
  ACCEPTED: {
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    dot: "bg-emerald-400",
  },
};


const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] ?? {
    badge: "bg-elevated text-muted border-border",
    dot: "bg-muted",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        style.badge,
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", style.dot].join(" ")} />
      {status.toLowerCase()}
    </span>
  );
};

export default StatusBadge
