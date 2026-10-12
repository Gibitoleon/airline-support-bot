import { ChevronRight, Pencil } from "lucide-react";
import formatDate from "../../utils/dateFormatter.js";

const GroupCard = ({ group, onOpen, onEdit }) => (
  <div
    onClick={() => onOpen(group)}
    className="group flex cursor-pointer flex-col rounded-xl border border-border bg-surface shadow-card transition hover:border-primary/30"
  >
    <div className="flex-1 p-5">
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
    </div>

    {/* Footer — edit only; stopPropagation keeps the card from navigating */}
    <div
      className="flex items-center justify-end border-t border-border px-3 py-2"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => onEdit(group)}
        aria-label={`Edit ${group.name}`}
        title="Edit"
        className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-primary/10 hover:text-primary"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default GroupCard;
