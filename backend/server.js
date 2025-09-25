import app from "./src/app.js"
import http from "http"
import { v2 as cloudinary } from "cloudinary"
import { initSocketServer } from "./src/sockets/socket.server.js"

const server = http.createServer(app)
initSocketServer(server);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  

app.listen(process.env.PORT, () => {
  console.log("Serveer running on port")
})