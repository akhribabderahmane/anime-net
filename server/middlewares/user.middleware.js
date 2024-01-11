import { isValidObjectId } from "mongoose";
import userModel from "../models/user.js";
import resetTokenModel from "../models/resetToken.js";
import { ObjectId } from "mongodb";

const isResetTokenValid=async (req,res,next)=>{
  const {token,id}=req.query;
  if(!token || !id ) {
    res.status(400).json({message:" invalid request !!",success:false});
  }
  if(!isValidObjectId(id)) {
    res.status(400).json({message:" invalid user id !!",success:false});
  }
  const user=await userModel.findById(id);
  if(!user) {
    return res.status(400).json({message:" user not found !!",success:false});
  }
  const resetToken=await resetTokenModel.findOne({owner:user._id});
  if(!resetToken) {
    return res.status(400).json({message:" reset token not found !!",success:false});
  }
  const isValid=await resetToken.compareToken(token);
  if(!isValid) {
    res.status(400).json({message:" invValid reset token (not found) !!",success:false});
  }
  req.user=user;
  next();
}


export {isResetTokenValid};