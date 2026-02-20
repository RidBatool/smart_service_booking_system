import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

export const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiClient;
