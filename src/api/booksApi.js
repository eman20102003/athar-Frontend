import axiosInstance from "./axiosInstance";

export const getBooks = (params) => axiosInstance.get("/books", { params });
export const getBook = (id) => axiosInstance.get(`/books/${id}`);
export const getCategories = () => axiosInstance.get("/categories");

// أدمن فقط
export const createBook = (formData) =>
  axiosInstance.post("/books", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateBook = (id, formData) =>
  axiosInstance.put(`/books/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteBook = (id) => axiosInstance.delete(`/books/${id}`);
