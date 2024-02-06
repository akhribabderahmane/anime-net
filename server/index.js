import express from 'express'
import dotenv from "dotenv"
import { connectDatabase } from './config/db.config.js';
import morgan from 'morgan'
import cors from 'cors';
import userRouter from './routers/user.Router.js';

const app = express()
const port = 3000
dotenv.config();
connectDatabase();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/user",userRouter)

 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));