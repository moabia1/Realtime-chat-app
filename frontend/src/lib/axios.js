import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://realtime-chat-app-2cae.onrender.com"
      : "/",
  withCredentials: true,
});
