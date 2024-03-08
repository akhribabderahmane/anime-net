import mongoose, { Mongoose } from "mongoose";

const chatroomSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    description:{
        type:String
    },
    avatar:{
        type:String,
        default:""
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Chatroom=mongoose.model("Chatroom",chatroomSchema);

export default Chatroom;
