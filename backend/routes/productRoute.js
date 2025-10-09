import express from "express";
import { addProduct, listProduct, reomoveProduct } from "../controller/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from '../middleware/adminAuth.js'

let productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRoutes.get("/list",listProduct)
productRoutes.post("/remove/:id",adminAuth,reomoveProduct)
export default productRoutes;