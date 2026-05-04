import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// SIGNUP
export const signupUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  generateToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    email: newUser.email,
  });
});

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  generateToken(res, existingUser._id);

  res.status(200).json({
    _id: existingUser._id,
    firstname: existingUser.firstname,
    lastname: existingUser.lastname,
    email: existingUser.email,
  });
});

// LOGOUT
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// GOOGLE
export const google = asyncHandler(async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    user = new userModel({
      firstname: name,
      lastname: name,
      email,
      profilePicture: googlePhotoUrl,
      password: hashedPassword,
    });

    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const { password, ...rest } = user._doc;

  res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json(rest);
});