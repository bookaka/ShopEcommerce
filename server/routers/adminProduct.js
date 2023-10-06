import express from "express";


import { postProduct, deleteProduct, UpdateProduct } from "../controllers/adminProduct.js";
import verify from "../middleware/auth.js"

const router = express.Router();

router.post("/postProduct",verify.verifyTokenAdmin,postProduct)
router.post("/deleteProduct/:id",verify.verifyTokenAdmin,deleteProduct)
router.post("/UpdateProduct/:id",verify.verifyTokenAdmin,UpdateProduct)



export default router

