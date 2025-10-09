import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import cors from 'cors'
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';

dotenv.config()

let port=process.env.PORT;

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["https://onecart-1-slb0.onrender.com","https://onecart-admin-slnf.onrender.com"],
  credentials:true
}))
app.options("*", cors());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
  connectDb();
})
