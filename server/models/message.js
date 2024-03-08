import mongoose, { Mongoose } from "mongoose";

const messageSchema = new Mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Chatroom",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: { type: String , required: true },
  timestamp:{
    type:Date,
    default: Date.now()
  }
});

const Message=mongoose.model("message",messageSchema);
