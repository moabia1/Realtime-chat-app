import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"
import cors from "cors"
import connectToDb from "./db/db.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config();
const app = express()

connectToDb()


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods:["GET","PUT","POST","DELETE"]
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./temp/"
}))


app.use("/user",userRoutes)
export default app