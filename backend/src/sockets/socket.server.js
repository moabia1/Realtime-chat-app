import { Server } from "socket.io"

const userSocketMap = new Map();
let io;
export function initSocketServer(httpServer) {
   io  = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id)
    
    const userId = socket.handshake.query.userId;
    
    if (!userId || typeof userId !== "string") {
      console.log("Invalid userId, rejecting connection");
      socket.disconnect();
      return;
    }

    if (userId) {
      userSocketMap.set(userId,socket.id)
    }

    io.emit("getOnlineUser", [...userSocketMap.keys()])
    
    socket.on("disconnect", () => {
      console.log("A user Disconnect", socket.id)
      userSocketMap.delete(userId)
      
      io.emit("getOnlineUser",[...userSocketMap.keys()])
    })
  })
}

export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId)
};

export {io};