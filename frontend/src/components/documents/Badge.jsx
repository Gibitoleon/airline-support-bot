const Badge = ({ styles, label }) => {
  const style = styles ?? {
    badge: "bg-elevated text-muted border-border",
    dot: "bg-muted",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        style.badge,
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", style.dot].join(" ")} />
      {label}
    </span>
  );
};

export default Badge;