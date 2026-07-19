import axiosInstance from "./axiosInstance";

export const askAI = (data) => axiosInstance.post("/ai/chat", data);
export const getChatHistory = (bookId) => axiosInstance.get(`/ai/history/${bookId}`);