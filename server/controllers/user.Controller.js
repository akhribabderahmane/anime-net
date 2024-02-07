import Joi from "joi";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import {
  generateEmailTemplate,
  generateOTP,
  mailTransport,
  plainmailTemplate,
  resetPasswordSuccessful,
  resetemailTemplate,
} from "../utils/authentification.js";
import verificationTokenModel from "../models/verificationToken.js";
import { isValidObjectId } from "mongoose";
import resetTokenModel from "../models/resetToken.js";
import { createRandomBytes } from "../utils/helper.js";
const login = async (req, res) => {
  const data = req.body;
  const validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });
  const validationResult = validator.validate(data);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: `validation error ${validationResult.error.message} `,
    });
  }
  // no validation error
  const { email, password } = data;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user doesnt exist", success: false });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: "invalide password", success: false });
  }
  const token = jsonwebtoken.sign({ id: user._id }, "secret", {
    expiresIn: "1d",
  });
  res.json({ token: token, success: true, username: user.username });
};
const userSignUp = async (req, res) => {
  const data = req.body;
  const validator = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });
  const validationResult = validator.validate(data);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: `validation error ${validationResult.error.message} `,
    });
  }
  // there is no error in validation
  const { username, email, password } = data;
  const newUser = new userModel({
    username: username,
    email: email,
    password: password,
  });
  const Userexists = await userModel.findOne({ email });
  if (Userexists) {
    return res
      .status(400)
      .json({ message: "this email is already in use", success: false });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  newUser.password = hashedPassword;
  const OTP = generateOTP();
  const verificationToken = new verificationTokenModel({
    owner: newUser._id,
    token: OTP,
  });
  await verificationToken.save();
  await newUser.save();
  mailTransport().sendMail({
    from: "emailverification@gmail.com",
    to: newUser.email,
    subject: `Email Verification for ${newUser.username}`,
    html: generateEmailTemplate(OTP),
  });
  res.json(newUser);
};

const verifyEmail = async (req, res) => {
  const { userID, otp } = req.body;
  if (!userID || !otp) {
    return res.status(400).json({
      message: "invalid request , missing paramaters ",
      success: false,
    });
  }
  if (!isValidObjectId(userID)) {
    return res
      .status(400)
      .json({ message: "invalid user id ", success: false });
  }
  const user = await userModel.findById(userID);
  if (!user) {
    return res
      .status(400)
      .json({ message: "sorry user not found !!", success: false });
  }
  if (user.verified) {
    return res.status(400).json({
      message: "sorry this user is already verified !!",
      success: false,
    });
  }

  const token = await verificationTokenModel.findOne({ owner: user._id });
  if (!token) {
    return res
      .status(400)
      .json({ message: "sorry user not found !!", success: false });
  }
  const isMatched = await token.compareToken(otp);
  if (!isMatched)
    return res.status(400).json({
      message: "invalide , please provide a valid token !!",
      success: false,
    });

  user.verified = true;

  await verificationTokenModel.findByIdAndDelete(token._id);
  await user.save();

  mailTransport().sendMail({
    from: "emailverification@gmail.com",
    to: user.email,
    subject: `Welcome Email for ${user.username}`,
    html: plainmailTemplate(),
  });
  return res.json({
    message: "email verification has been done successfully",
    success: true,
  });
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const validator = Joi.object({
    email: Joi.string().email().required(),
  });
  const validationResult = validator.validate({ email });
  if (validationResult.error) {
    return res
      .status(400)
      .json({ message: "validation error ", success: false });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "user not found ", success: false });
  }
  const token = await resetTokenModel.findOne({ owner: user._id });
  if (token) {
    res.status(400).json({
      message: "only after one hour you can request for another token",
      success: false,
    });
  }

  const token2 = await createRandomBytes();
  const resetToken = new resetTokenModel({ owner: user._id, token: token2 });
  resetToken.save();

  mailTransport().sendMail({
    from: "security@gmail.com",
    to: user.email,
    subject: `password reset for ${user.username}`,
    html: resetemailTemplate(
      `http://localhost:3000/api/user/reset-password?token=${token2}&id=${user._id}`
    ),
  });

  res.json({
    message: "password reset link sent to you successfully",
    success: true,
  });
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return res
      .status(400)
      .json({ message: "user not found !!", success: false });
  }
  const isSamePassword = await bcrypt.compareSync(password, user.password);
  if (isSamePassword) {
    return res.status(400).json({
      message: "you can't use the same password as the previuos one !!",
      success: false,
    });
  }
  const validator = Joi.object({
    password: Joi.string().min(8).max(20).required(),
  });
  const validationResult = validator.validate({ password });
  if (validationResult.error) {
    return res.status(400).json({
      message: "inValid password !!",
      error: validationResult,
      success: false,
    });
  }

  console.log(user);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;

  await user.save();
  await resetTokenModel.findOneAndDelete({ owner: user._id });
  mailTransport().sendMail({
    from: "security@gmail.com",
    to: user.email,
    subject: `successful password reset for ${user.username}`,
    html: resetPasswordSuccessful(),
  });
  return res.json({ message: "password reset successfull", success: true });
};

const updateUsername = async (req, res) => {
  const { username } = req.body;
  //checking if the new username is already taken or not
  const userInDb = await userModel.findOne({ username });
  if (userInDb && userInDb.username !== username) {
    return res.status(409).json({
      message: "this username has been used by someone else ",
      success: false,
    });
  }
  //updating the username in database
  userModel
    .findByIdAndUpdate(req.id, { username }, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("error occured while updating the username");
      res
        .status(500)
        .json({ message: "server error", error: err, success: false });
    });
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  const userID = req.id;
  const user = userModel.findOne({ _id: userID });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
      success: false,
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.updateOne({ password: hashedPassword }).exec();
    return res.json({
      message: "password updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "update password has failed",
      error: error,
      success: false,
    });
  }
};

//update  profile pic of a user

const updateProfilePic = async (req, res) => {
  const userID = req.id;
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  // File uploaded successfully
  const filePath = file.path;
  console.log("hiii")
  console.log("filepath :",filePath)
  const user = await userModel.findById(userID);
  if (!user) {
    return res.status(400).json({
      message: "user not found",
      success: false,
    });
  }
  // update avatar in user in database
  try {
    const oldFilePath = user.avatar;
    user.avatar = filePath;
    await user.save();
    // Delete the old profile picture file from the server
    if (oldFilePath) {
      fs.unlinkSync(oldFilePath);
    }
    return res.json({
      message: "user profile picture has been updated sucessfully !",
      success: true,
    });
    //delete old image from the server folder
  } catch (error) {
    return res.status(500).json({
      message: "updating profile picture has failed",
      success: false,
      error: error,
    });
  }
};

export {
  login,
  userSignUp,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateUsername,
  updatePassword,
  updateProfilePic
};
