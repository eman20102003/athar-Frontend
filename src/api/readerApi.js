import axiosInstance from "./axiosInstance";

export const addBookmark = (data) => axiosInstance.post("/bookmarks", data);
export const getBookmarks = (bookId) => axiosInstance.get(`/bookmarks/${bookId}`);
export const deleteBookmark = (id) => axiosInstance.delete(`/bookmarks/${id}`);

export const addHighlight = (data) => axiosInstance.post("/highlights", data);
export const getHighlights = (bookId) => axiosInstance.get(`/highlights/${bookId}`);
export const deleteHighlight = (id) => axiosInstance.delete(`/highlights/${id}`);

export const createNote = (data) => axiosInstance.post("/notes", data);
export const getNotes = (bookId) => axiosInstance.get(`/notes/${bookId}`);
export const updateNote = (id, content) => axiosInstance.put(`/notes/${id}`, { content });
export const deleteNote = (id) => axiosInstance.delete(`/notes/${id}`);
