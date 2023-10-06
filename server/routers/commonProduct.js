import express from "express";

import {searchProduct,infProduct } from '../controllers/commonProduct.js';

const router = express.Router();

router.get('./search',searchProduct);
router.get('./getProduct/:idP',infProduct);

export default router

