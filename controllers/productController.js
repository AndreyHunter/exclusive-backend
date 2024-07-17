import {
    createProductService,
    addProductImagesService,
    addReviewService,
    getUserReviewsService,
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

export const addProductImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const imagesUrls = req.files.map((file) => file.location);
        const product = await addProductImagesService(imagesUrls, req.params.id);

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
        const review = await addReviewService(args);

        res.json({ message: 'Review successfully added', review });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const reviews = await getUserReviewsService(req.params.id);
        res.json(reviews);
    } catch (err) {
        res.status(err.StatusCode || 500).json({ message: err.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
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
