import express from "express";
import {auth} from "./../middlewares/auth.js"
import { addUser, create } from "../controllers/chatroom.controller.js";

const chatRoomRouter=express.Router();

chatRoomRouter.post("",auth,create).post("/:id/join",auth,addUser);


export default chatRoomRouter;