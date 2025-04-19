import axios from "axios";
import api from "../constants/api";

const instance = axios.create({
  baseURL: api.baseUrl,
  headers: { "Content-Type": "application/json" },
});

const adminInstance = axios.create({
  baseURL: api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Token is missed in a local storage");
    }
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export { instance, adminInstance };
