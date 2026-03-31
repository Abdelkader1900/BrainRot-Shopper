import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express ();
app.use(express.json());

app.get("/api/products",async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success : true, data : products})
    } catch (error) {
        console.log("Fetching impossible erreur serveur")
        res.status(500).json({success : false, message : "Erreur Serveur"})
    }
})


app.put("/api/products/:id", async(req,res) =>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Not found INVALID ID !"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success : true, data: updatedProduct})
    } catch (error) {
        res.status(404).json({success : false , message : "Erreur Serveur"})
    }
})

app.post("/api/products",async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({success:false, message: "Veuillez Remplir Tous les champs"})

    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success : true, data: newProduct})
        console.log("Création OK")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false , message : "Création échouée"  })
    }
});

app.delete(("/api/products/:id"), async (req,res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true, message: "Le produit a été suppr"})
    } catch (error) {
        res.status(404).json({success : false , message : "Produit not found"})
        
    }

})

console.log(process.env.MONGO_URI)


app.listen(5000, () =>{
    connectDB();
    console.log("L'appli écoute sur le port 5000 => http://localhost:5OOO/products ");
})