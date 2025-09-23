import express from "express"
import {
  signinController,
  signoutController,
  signupController,
  getUserController,
  updateProfileController
} from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/sign-up",signupController)
router.post("/sign-in", signinController)
router.get("/sign-out",authMiddleware, signoutController)
router.get("/me",authMiddleware, getUserController)
router.put("/update-profile",authMiddleware,updateProfileController)

export default router