import axiosInstance from "./axiosInstance";

export const createPaymentIntent = (bookId) =>
  axiosInstance.post("/payment/create-payment-intent", { bookId });
export const getMyOrders = () => axiosInstance.get("/payment/my-orders");
export const getOrderStatus = (orderId) => axiosInstance.get(`/payment/order/${orderId}`);
export const confirmPayment = (orderId) => axiosInstance.post(`/payment/confirm/${orderId}`);