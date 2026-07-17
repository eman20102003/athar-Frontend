export const getFileUrl = (path) => {
  if (!path) return "";

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  return `${baseURL}/${path.replace(/^\/+/, "")}`;
};