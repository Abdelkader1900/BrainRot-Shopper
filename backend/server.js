import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express ();
app.use(express.json());
app.use("/api/products", productRoutes)


console.log(process.env.MONGO_URI)


app.listen(5000, () =>{
    connectDB();
    console.log("L'appli écoute sur le port 5000 => http://localhost:5OOO/products ");
})