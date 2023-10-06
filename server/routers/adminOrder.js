import express from "express";

import { updateOrderStatus, getOrder, getRevenueOrder } from "../controllers/adminOrder.js";
import verify from "../middleware/auth.js"

const router = express.Router();
router.post("/updateOrderStatus/:idOrder",verify.verifyTokenAdmin,updateOrderStatus)
router.get("/getRevenueOrder",verify.verifyTokenAdmin,getRevenueOrder)
router.get("getOrder",verify.verifyTokenAdmin,getOrder)



export default router

