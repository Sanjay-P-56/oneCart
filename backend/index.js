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

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow trusted frontends
const allowedOrigins = [
  "https://onecart-1-slb0.onrender.com",      // main customer site
  "https://onecart-admin-slnf.onrender.com"   // admin panel
];

// ✅ CORS middleware (must be before express.json)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  connectDb();
});
