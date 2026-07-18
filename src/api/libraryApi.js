import axiosInstance from "./axiosInstance";

export const getPurchasedBooks = () => axiosInstance.get("/library/purchased");
export const getFavorites = () => axiosInstance.get("/library/favorites");
export const toggleFavorite = (bookId) => axiosInstance.post(`/library/favorites/${bookId}`);
export const getContinueReading = () => axiosInstance.get("/library/continue-reading");
export const updateProgress = (bookId, currentPage) =>
  axiosInstance.put(`/library/progress/${bookId}`, { currentPage });
export const getBookFile = (bookId, type) =>
  axiosInstance.get(`/library/book/${bookId}/${type}`, { responseType: "blob" });