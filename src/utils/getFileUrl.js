export const getFileUrl = (path) => {
  if (!path) return "";
  const normalized = path.replace(/\\/g, "/").replace(/^src\//, "");
  const base = import.meta.env.VITE_API_URL.replace("/api", "");
  return `${base}/${normalized}`;
};