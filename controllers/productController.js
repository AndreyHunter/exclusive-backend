import { ProductService } from '../services/index.js';

// Create
export const createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const addProductImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const imagesUrls = req.files.map((file) => file.location);
        const product = await ProductService.addProductImages(imagesUrls, req.params.id);

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const args = {
            userId: req.user._id,
            productId: req.body.productId,
            rating: req.body.rating,
            comment: req.body.comment,
        };
        const review = await ProductService.addReview(args);

        res.json({ message: 'Review successfully added', review });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

// Read
export const getProducts = async (req, res) => {
    try {
        const { limit, sort } = req.query;
        const products = await ProductService.getProducts({ limit, sort });
        res.json({
            products,
            quantity: products.length,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await ProductService.getProduct(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { limit, sort } = req.query;
        const categoryPath = req.params[0];

        const products = await ProductService.getProductsByCategory({
            categoryPath,
            limit,
            sort,
        });

        res.json({ products, quantity: products.length });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getFlashSalesProducts = async (req, res) => {
    try {
        const { limit, sort } = req.query;
        const products = await ProductService.getFlashSalesProducts({ limit, sort });

        res.json({ products, quantity: products.length });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getBestSellers = async (req, res) => {
    try {
        const { limit, sort } = req.query;
        const products = await ProductService.getBestSellers({ limit, sort });

        res.json({ products, quantity: products.length });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const reviews = await ProductService.getUserReviews(req.params.id);
        res.json(reviews);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

// Update
export const updateProduct = async (req, res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

// Delete
export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductService.deleteProduct(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
