import apiClient, { authHeader } from "./apiClient";

export const getAdminUsers = async (token) => {
  const response = await apiClient.get("/admin/users", authHeader(token));
  return response.data;
};

export const getAdminBookings = async (token) => {
  const response = await apiClient.get("/admin/bookings", authHeader(token));
  return response.data;
};

export const getPendingProviders = async (token) => {
  const response = await apiClient.get("/admin/providers/pending", authHeader(token));
  return response.data;
};

export const approveProvider = async (token, userId) => {
  const response = await apiClient.patch(`/admin/providers/${userId}/approve`, {}, authHeader(token));
  return response.data;
};
