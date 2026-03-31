import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success : true, data : products})
    } catch (error) {
        console.log("Fetching impossible erreur serveur")
        res.status(500).json({success : false, message : "Erreur Serveur"})
    }
}

export const getProduct = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Not found INVALID ID !"})
    }
    try {
        const getProduct = await Product.findById(id);
        res.status(200).json({success : true, data: getProduct})
    } catch (error) {
        res.status(404).json({success : false , message : "Erreur Serveur"})
    }
}


export const createProduct = async (req,res) => {
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
}

export const updateProduct = async(req,res) =>{
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
}

export const deleteProduct =  async (req,res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true, message: "Le produit a été suppr"})
    } catch (error) {
        res.status(404).json({success : false , message : "Produit not found"})
        
    }
}