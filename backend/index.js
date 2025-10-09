import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://onecart-1-slb0.onrender.com",
    "https://onecart-admin-slnf.onrender.com"
  ],
  credentials: true
}));
app.options("*", cors());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Serve frontend build (React/Vite SPA)
app.use(express.static(path.join(__dirname, "frontend/build"))); // adjust path if needed

// Catch-all route to serve index.html for SPA routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Start server & connect DB
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
