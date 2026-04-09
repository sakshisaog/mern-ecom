import Product from "../models/product.js";
import mongoose from "mongoose";

// create product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all products (WITH SEARCH)
export const getProducts = async (req, res) => {
    try {
        const {search, category} = req.query;

        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// get single product
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update product
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Product updated successfully",
            product: updated,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};