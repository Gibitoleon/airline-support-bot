import { ChevronRight } from "lucide-react";
import formatDate from "../../utils/dateFormatter.js";

const GroupCard = ({ group, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(group)}
    aria-label={`View ${group.name}`}
    className="group flex w-full flex-col rounded-xl border border-border bg-surface p-5 text-left shadow-card transition hover:border-primary/30"
  >
    <div className="flex items-start justify-between gap-3">
      <p className="min-w-0 flex-1 line-clamp-2 text-sm font-medium text-text">
        {group.name}
      </p>
      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </div>

    <div className="mt-4 space-y-1.5 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-muted/70">Created</span>
        <span className="text-text">{formatDate(group.created_at)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted/70">Updated</span>
        <span className="text-text">{formatDate(group.updated_at)}</span>
      </div>
    </div>
  </button>
);

export default GroupCard;