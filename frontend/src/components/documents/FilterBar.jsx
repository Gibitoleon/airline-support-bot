import { Search, X } from "lucide-react";
import formatLabel from "../../utils/labelFormatter.js";
import {
  DOCUMENT_DOMAIN_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  DOCUMENT_ACCESS_OPTIONS,
  DOCUMENT_STATUS_OPTIONS,
} from "../../../data/document.data.js";

const FilterBar = ({
  query,
  setQuery,
  domain,
  setDomain,
  type,
  setType,
  access,
  setAccess,
  status,
  setStatus,
  onClear,
  hasActiveFilters,
}) => {
  const filters = [
    {
      value: domain,
      onChange: setDomain,
      options: DOCUMENT_DOMAIN_OPTIONS,
      label: "Domain",
    },
    {
      value: type,
      onChange: setType,
      options: DOCUMENT_TYPE_OPTIONS,
      label: "Type",
    },
    {
      value: access,
      onChange: setAccess,
      options: DOCUMENT_ACCESS_OPTIONS,
      label: "Access",
    },
    {
      value: status,
      onChange: setStatus,
      options: DOCUMENT_STATUS_OPTIONS,
      label: "Status",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search by title, document ID, or filename..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-elevated py-2.5 pl-9 pr-9 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted transition hover:bg-surface-light hover:text-text"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <select
            key={f.label}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/30"
          >
            <option value="ALL" className="bg-elevated">
              {f.label}: All
            </option>
            {f.options.map((o) => (
              <option key={o} value={o} className="bg-elevated">
                {formatLabel(o)}
              </option>
            ))}
          </select>
        ))}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface-light hover:text-text"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;