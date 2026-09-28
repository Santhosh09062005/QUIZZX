import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { clerkMiddleware } from '@clerk/express'
import {connectDB} from './config/db.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import resultRoutes from './routes/result.js';

const app=express();
const PORT= process.env.PORT;

//MIDDLEWARES
app.use(clerkMiddleware());
app.use(cors());
app.use("/api/users", userRoutes);
app.use(express.json());


//DB
connectDB();

//ROUTES
app.use("/api/admin",adminRoutes);
app.use("/api/result",resultRoutes);

app.get("/",(req,res)=>{
    res.send("API WORKING")
});

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
});