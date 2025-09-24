import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import {
  getAllUserController,
  getMessageController,
  sendMessageController
} from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users", authMiddleware, getAllUserController)
router.get("/:id", authMiddleware, getMessageController)
router.post("/send/:id",authMiddleware,sendMessageController)
export default router