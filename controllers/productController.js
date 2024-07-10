import {
    createProductService,
    getProductsService,
    getProductService,
    updateProductService,
    deleteProductService,
} from '../services/productsService.js';

export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        res.json({
            products,
            amount: products.length,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await getProductService(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await updateProductService(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await deleteProductService(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};