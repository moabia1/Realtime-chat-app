import { asyncError } from "../middlewares/asyncError.middleware.js"
import { userModel } from "../models/user.model.js";

export const getAllUserController = asyncError(async (req, res, next) => {
  const user = req.user;
  const filterUser = await userModel.find({ _id: { $ne: user } }).select("-password")
  res.status(200).json({
    success: true,
    filterUser
  })
})
export const getMessageController = asyncError(async (req,res,next)=>{
  const receiverId = req.params.id
  
})
export const sendMessageController = asyncError(async (req,res,next)=>{

})