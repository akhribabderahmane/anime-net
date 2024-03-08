import Joi from "joi";
import Chatroom from "../models/chatroom.js";
import userModel from "../models/user.js";

const create = async (req,res) => {
  const userID = req.id;
  const data = req.body;
  const validator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  const validationResult = validator.validate(data);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: `validation error ${validationResult.error.message} `,
    });
  }

  const { name, description } = data;
  const userExist = await Chatroom.findOne({ name: name });
  if (userExist) {
    return res
      .status(400)
      .json({ message: "this name is already in use", success: false });
  }
  try {
    const newChatroom=new Chatroom({
        name:name,
        description:description,
        avatar:"",
        members:[],
        creator:userID,
      });
      await newChatroom.save();
      return res.json({message:"chatroom has been created successfully",success:true,chatroom:newChatroom});
  } catch (error) {
      return res.status(500).json({
        message:"error has occured in the server",
        success:false,
        error:error
      })
  }
 
};

const addUser=async (req,res)=>{
   // const userID=req.id;
    const chatroomID = req.params.id;
    const chatroom=await Chatroom.findById(chatroomID);
    if (!chatroom) {
        return res.status(404).json({ message: 'Chatroom not found' });
    }
    const {userId}=req.body;
    const user=await userModel.findById(userId);
    if(!user){
        return res.status(404).json({message:"user doesnt exist"});
    }
    if(chatroom.members.includes(userId)){
      return res.status(201).json({message:"this user is already in the chatroom",success:true})
    }
    try {
        chatroom.members.push(userId);
        chatroom.save();
        return res.status(200).json({message:"user has been added to the chat room successfully",success:true})
    } catch (error) {
        return res.status(500).json({message:"error has occured in the server",success:false,error:error});
    }

}

export {create,addUser};