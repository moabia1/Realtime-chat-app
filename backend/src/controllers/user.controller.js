import { asyncError } from "../middlewares/asyncError.middleware.js"
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateJwtToken } from "../utils/jwtToken.js";
import {v2 as cloudinary} from "cloudinary"

export const signupController = asyncError(async (req, res) => {

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message:"Please provide all required field"
    })
  }

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide correct format of email",
    });
  }
  
  if (password.length<6) {
    return res.status(400).json({
      success: false,
      message: "Password length must be 6 character",
    });
  }

  const emailExists = await userModel.findOne({
    email:email
  })
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: "email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await userModel.create({
    fullName,
    email,
    password:hashedPassword,
    avatar: {
      public_id: "",
      url:""
    }
  })

  generateJwtToken(user, "User Signup Successfully",201,res);
})

export const signinController = asyncError(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required field",
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide correct email",
    });
  }

  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(400).json({
      success: false,
      message:"Unauthorized user please register"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password",
    })
  }
  generateJwtToken(user,"User login succesfully",200,res)
})

export const signoutController = asyncError(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development" ? true : false,
    })
    .json({
      success: true,
      message:"User Logout Succesfully"
    });
})

export const getUserController = asyncError(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "user fetch successfully",
    user
  })
})

export const updateProfileController = asyncError(async (req, res) => {
  const { fullName, email } = req.body;

  if (fullName.trim().length === 0 || email.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "fullName and email can't be empty",
    });
  }

  // Check for duplicate email
  const existingUser = await userModel.findOne({
    email,
    _id: { $ne: req.user._id },
  });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "This email is already in use by another account",
    });
  }

  const avatar = req.files?.avatar;
  let cloudinaryResponse = {};

  if (avatar) {
    try {
      const oldAvatarId = req?.user?.avatar?.public_id;
      if (oldAvatarId && oldAvatarId.length > 0) {
        await cloudinary.uploader.destroy(oldAvatarId);
      }

      cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
          folder: "chat-app-avatars",
          transformation: [
            { width: 300, height: 300, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
    } catch (error) {
      console.error("Cloudinary upload error: ", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar please try again later",
      });
    }
  }

  let data = { fullName, email };

  if (
    avatar &&
    cloudinaryResponse?.public_id &&
    cloudinaryResponse?.secure_url
  ) {
    data.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  let user = await userModel.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});