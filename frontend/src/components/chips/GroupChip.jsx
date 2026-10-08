import { X } from "lucide-react";

const formatLabel = (value) =>
  value
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");


const GroupChip = ({ group, onRemove }) => (
  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-elevated px-3 py-2.5">
    <span className="min-w-0 truncate text-sm font-medium text-text">
      {formatLabel(group.name)}
    </span>
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove from ${group.name}`}
      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </div>
);

export default GroupChip;