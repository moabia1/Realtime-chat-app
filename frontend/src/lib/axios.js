import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://realtime-chat-app-2cae.onrender.com",
  withCredentials: true,
});
