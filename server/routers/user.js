import express from 'express';
import verify from "../middleware/auth.js"

import { UpdateInforUser, ChangePassword, getCart, getOrder, AddOrder, AddProductToCart, DeleteProductInCart } from '../controllers/user.js';
const router = express.Router();

router.post('./updateInforUser', verify.verifyToken, UpdateInforUser);
router.post('./changePassword', verify.verifyToken, ChangePassword);
router.get('./getCart', verify.verifyToken, getCart);
router.get('./getOrder', verify.verifyToken,getOrder );
router.post('./addProductTCart', verify.verifyToken,AddProductToCart );
router.post('./addOrder', verify.verifyToken, AddOrder);
router.post('./deleteProductInCart', verify.verifyToken, DeleteProductInCart);

export default router
