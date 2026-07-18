import axiosInstance from "./axiosInstance";

export const createReview = (bookId, data) => axiosInstance.post(`/reviews/${bookId}`, data);
export const getReviews = (bookId) => axiosInstance.get(`/reviews/${bookId}`);
export const updateReview = (id, data) => axiosInstance.put(`/reviews/${id}`, data);
export const deleteReview = (id) => axiosInstance.delete(`/reviews/${id}`);