import mongoose from "mongoose";

import validator from "validator"
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique: true
    },
    email:{
        type: String,
        require: [true,'email is required'],
        vaidate:{
            validator: validator.isEmail,
            message:"email format is invalid",
        },
        unique:true
    },
    password:{
        type :String,
        require: [true,'password is required'],
        minlength:8,
        maxlenght:20,
    },
    avatar:{
        type:String,
        default:""
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    }
});

const userModel=mongoose.model("users",userSchema);

export default userModel;