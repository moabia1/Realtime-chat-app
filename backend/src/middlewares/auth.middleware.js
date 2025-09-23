import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message:"Unauthorized user login first"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById({
      _id:decoded.id
    })

    req.user = user
    next()
  } catch (error) {
    console.log("token error",error)
  }
}