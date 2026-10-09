const formatLabel = (value) => {
  // Handle null/undefined up front
  if (value === null || value === undefined) return "";

  // If it's an object (e.g. a role like { id, name }), use its name
  const raw =
    typeof value === "object" && value !== null ? value.name : value;

  if (raw === null || raw === undefined) return "";

  return String(raw)
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default formatLabel;