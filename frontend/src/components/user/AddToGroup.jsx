import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

const formatLabel = (value) =>
  value
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");


const AddToGroup = ({ availableGroups, onAdd }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(availableGroups[0]?.id?.toString() ?? "");
  }, [availableGroups]);

  if (availableGroups.length === 0) {
    return (
      <p className="text-sm text-muted">
        This user is already in every available group.
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const groupId = Number(selected);
    if (!groupId) return;
    onAdd(groupId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30 sm:flex-1"
      >
        {availableGroups.map((g) => (
          <option key={g.id} value={g.id} className="bg-elevated">
            {formatLabel(g.name)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-surface sm:w-auto"
      >
        <UserPlus className="h-4 w-4" />
        Add to Group
      </button>
    </form>
  );
};

export default AddToGroup;
