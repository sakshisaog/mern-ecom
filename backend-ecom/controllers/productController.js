import Product from '../models/product.js';

// create product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.json({
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json(products);
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
            message: 'Product updated successfully',
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

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};