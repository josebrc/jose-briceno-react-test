import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
});

const EventTypes = {
  Unauthorized: "Unauthorized",
};

api.interceptors.request.use(
  async (config) => {
    try {
      config.headers["Accept"] = "application/json";
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { api, EventTypes };
