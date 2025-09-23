import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: String,
  media:String,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true
  }
}, {
  timestamps:true
})

export const messageModel = mongoose.model("message",messageSchema);