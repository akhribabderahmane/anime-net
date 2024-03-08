import mongoose from "mongoose";
import bcrypt from "bcrypt";

const verificationTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

verificationTokenSchema.pre("save", async function(next){
  if (this.isModified("token")) {
    const hashedToken = await bcrypt.hash(this.token, 8);
    this.token = hashedToken;
  }
  next();
});

verificationTokenSchema.methods.compareToken = async function(token){
  const result = await bcrypt.compare(token,this.token);
  return result;
};

const verificationTokenModel=new mongoose.model("verificationTokens",verificationTokenSchema);
export default verificationTokenModel;
