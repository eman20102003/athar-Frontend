import axiosInstance from "./axiosInstance";

export const getDashboardSummary = () => axiosInstance.get("/admin/summary");
export const getAllUsers = (params) => axiosInstance.get("/admin/users", { params });
export const createUserByAdmin = (data) => axiosInstance.post("/admin/users", data);
export const updateUserRole = (id, role) => axiosInstance.put(`/admin/users/${id}/role`, { role });
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);
export const getAllOrders = (params) => axiosInstance.get("/admin/orders", { params });
export const getAllReviews = (params) => axiosInstance.get("/admin/reviews", { params });
export const deleteReviewAdmin = (id) => axiosInstance.delete(`/admin/reviews/${id}`);