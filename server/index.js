import express from 'express'
import dotenv from "dotenv"
import { createServer} from 'http'
import {Server} from 'socket.io'
import { connectDatabase } from './config/db.config.js';
import morgan from 'morgan'
import userRouter from './routers/user.Router.js';
import cors from 'cors'
import chatRoomRouter from './routers/chatroom.router.js';


const app = express()
const port = 3000
dotenv.config();
app.use(cors());
connectDatabase();

const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user",userRouter);
app.use("/api/chatroom",chatRoomRouter);

// io.on('connection', (socket) => {
//     console.log(` user connected ${socket.id}`);
//     socket.on("join_room",(data)=>{
//           socket.join(data);
//     })
//     socket.on("send_message",(data)=>{
//         console.log("data :",data);
//         socket.to(data.room).emit("recieve_message",data);
//     });
   
// });


 
server.listen(port, () => console.log(`Example app listening on port ${port}!`));