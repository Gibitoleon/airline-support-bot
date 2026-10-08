const formatDate = (iso, options = {}) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", ...options });

export default formatDate;