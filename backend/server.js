import app from "./src/app.js"
import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.envCLOUDINARY_API_SECRET,
});
  

app.listen(process.env.PORT, () => {
  console.log("Serveer running on port")
})