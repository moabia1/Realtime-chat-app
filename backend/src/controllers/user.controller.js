import { asyncError } from "../middlewares/asyncError.middleware.js"
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateJwtToken } from "../utils/jwtToken.js";


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

export const getUserController = asyncError(async(req, res) => {})

export const updateProfileController = asyncError(async(req, res) => {})