import express from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  userSignUp,
  verifyEmail,
} from "../controllers/user.Controller.js";
import { isResetTokenValid } from "../middlewares/user.middleware.js";

const userRouter = express.Router();
userRouter
  .post("/login", login)
  .post("/signUp", userSignUp)
  .post("/verify-email", verifyEmail)
  .post("/forgot-password",forgotPassword)
  .post("/reset-password",isResetTokenValid,resetPassword);

export default userRouter;
