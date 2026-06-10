import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
   const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        logoutUser(); 
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        logoutUser(); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export function logoutUser() {
  console.log("Foydalanuvchi tizimdan chiqmoqda...");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.replace("/login");
}