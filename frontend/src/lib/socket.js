import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io(
    import.meta.env.MODE === "development"
      ? "https://realtime-chat-app-2cae.onrender.com"
      : "/",
    {
      query: { userId },
    }
  );

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
