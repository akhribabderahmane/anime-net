import mongoose from "mongoose";
import bcrypt from "bcrypt";

const resetTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

resetTokenSchema.pre("save", async function(next){
  if (this.isModified("token")) {
    const hashedToken = await bcrypt.hash(this.token, 8);
    this.token = hashedToken;
  }
  next();
});

resetTokenSchema.methods.compareToken = async function(token){
  const result = await bcrypt.compare(token,this.token);
  return result;
};

const resetTokenModel=new mongoose.model("resetTokens",resetTokenSchema);
export default resetTokenModel;
