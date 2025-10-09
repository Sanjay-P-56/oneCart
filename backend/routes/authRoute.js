import express from 'express';
import { registeration ,login, logout, googleLogin, adminLogin} from '../controller/authController.js';

const authRoutes=express.Router();

authRoutes.post("/registeration",registeration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)
authRoutes.post("/googlelogin",googleLogin)
authRoutes.post("/adminlogin",adminLogin)

export default authRoutes;