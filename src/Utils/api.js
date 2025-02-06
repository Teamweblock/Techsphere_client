import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const axiosApi = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["x-access-token"] = token; // Attach token to header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;