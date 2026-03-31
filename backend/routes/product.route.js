import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/",getAllProducts)
router.get("/:id",getProduct)
router.put("/:id", updateProduct)
router.post("/",createProduct);
router.delete(("/:id"), deleteProduct)

export default router;