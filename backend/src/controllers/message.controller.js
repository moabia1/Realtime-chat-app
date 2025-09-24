import { asyncError } from "../middlewares/asyncError.middleware.js"
import { messageModel } from "../models/message.model.js";
import { userModel } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";


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
  const myId = req.user._id;
  const receiver = await userModel.findById(receiverId);
  if (!receiver) {
    return res.status(400).json({
      success: false,
      message:"Receiver id invalid"
    })
  }

  const message = await messageModel.find({
    $or: [
      { senderId: myId, receiverId: receiver },
      { senderId: receiverId, receiverId: myId }
    ],
  }).sort({ createdAt: 1 });
  
  res.status(200).json({
    success: true,
    message
  })
})


export const sendMessageController = asyncError(async (req, res, next) => {
  const { text } = req.body;
  const media = req.files?.media;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const receiver = await userModel.findById(receiverId);
  if (!receiver) {
    return res.status.code(400).json({
      success: false,
      message:"Receiver Id Invalid"
    })
  }
  let sanitizedText = text?.trim() || "";
  if (!sanitizedText && !media) {
    return res.status(400).json({
      success: false,
      message:"Don't send empty messages"
    })
  }

  let mediaUrl = "";

  if (media) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(media.tempFilePath, {
        resource_type: "auto",
        folder: "chat-app-media",
        transformation: [
          { width: 300, height: 300, crop: "limit" },
          { quality: "auto" },
          {fetch_format:"auto"}
        ]
      })
      mediaUrl = uploadResponse?.secure_url; 
    } catch (error) {
      console.error("Cloudinary upload error: ", error)
      return res.status(500).json({
        success: false,
        message:"Failed to upload avatar please try again later"
      })
    }
  }
})