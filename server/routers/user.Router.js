import express from "express";
import {auth} from "./../middlewares/auth.js"
import {
  forgotPassword,
  login,
  resetPassword,
  userSignUp,
  verifyEmail,
  updateUsername,
  updatePassword,
  updateProfilePic,
  getProfilePic,
  getUserInfos,
  getAllUsers,
  searchUser
} from "../controllers/user.Controller.js";
import { isResetTokenValid } from "../middlewares/user.middleware.js";
import { upload } from "../middlewares/multerInit.js";

const userRouter = express.Router();
userRouter
  .post("/login", login)
  .post("/signUp", userSignUp)
  .post("/verify-email", verifyEmail)
  .post("/forgot-password",forgotPassword)
  .post("/reset-password",isResetTokenValid,resetPassword)
  .patch("/update-username",auth,updateUsername) // only authenticated users can access this route
  .patch("/update-password",auth,updatePassword) // only authenticated users can access this route
  .patch("/update-profilePic",auth,upload.single("profilePic"),updateProfilePic) // only authenticated users can access this route
  .get("/get-profile-picture",auth,getProfilePic) // only authenticated users can access this route
  .get("/get-user-infos",auth,getUserInfos) // only authenticated users can access this route
  .get("/get-users",auth,getAllUsers) // only authenticated users can access this route
  .get("/search-users",auth,searchUser) // only authenticated users can access this route




  
export default userRouter;
