import express from 'express'
import dotenv from "dotenv"
import { createServer} from 'http'
import {Server} from 'socket.io'
import { connectDatabase } from './config/db.config.js';
import morgan from 'morgan'
import userRouter from './routers/user.Router.js';

const app = express()
const port = 3000
const server=createServer(app);
const io=new Server(server);
dotenv.config();
connectDatabase();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user",userRouter)

// io.on('connection',(socket)=>{
//    console.log('a user connected');
//    socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// })

 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));