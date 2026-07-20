export const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_URL.replace("/api", "");
  return `${base}/${path.replace(/\\/g, "/").replace(/^src\//, "")}`;
};