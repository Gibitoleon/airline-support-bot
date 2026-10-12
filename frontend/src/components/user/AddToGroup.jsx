import { useState, useEffect } from "react";
import { Loader2, UserPlus } from "lucide-react";
import formatLabel from "../../utils/labelFormatter.js";

const AddToGroup = ({ availableGroups, onAdd, isPending }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(availableGroups[0]?.id?.toString() ?? "");
  }, [availableGroups]);

  if (availableGroups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-elevated/40 p-4 text-center">
        <p className="text-sm text-muted">
          This user is already in every available group.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;
    const groupId = Number(selected);
    if (!groupId) return;
    onAdd(groupId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <select
        value={selected}
        disabled={isPending}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full min-w-0 rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
      >
        {availableGroups.map((g) => (
          <option key={g.id} value={g.id} className="bg-elevated">
            {formatLabel(g.name)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" />
            Add to Group
          </>
        )}
      </button>
    </form>
  );
};

export default AddToGroup;
