import apiClient, { authHeader } from "./apiClient";

export const getAllServices = async (token) => {
  const response = await apiClient.get("/services", authHeader(token));
  return response.data;
};

export const getMyServices = async (token) => {
  const response = await apiClient.get("/services/my-services", authHeader(token));
  return response.data;
};

export const createService = async (token, payload) => {
  const response = await apiClient.post("/services", payload, authHeader(token));
  return response.data;
};

export const updateService = async (token, id, payload) => {
  const response = await apiClient.patch(`/services/${id}`, payload, authHeader(token));
  return response.data;
};

export const deleteService = async (token, id) => {
  const response = await apiClient.delete(`/services/${id}`, authHeader(token));
  return response.data;
};
