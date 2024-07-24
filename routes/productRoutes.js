import express from 'express';

import {
    createProduct,
    addProductImages,
    addReview,
    getUserReviews,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getFlashSalesProducts,
    getBestSellers,
} from '../controllers/productController.js';

import { productValidation, updateProductValidation } from '../validations/productValidation.js';
import { handleErrors, checkAuth } from '../middlewares/index.js';
import upload from '../s3Config.js';

const router = express.Router();

// Create
router.post('/products', checkAuth, productValidation, handleErrors, createProduct);
router.post('/products/images/:id', checkAuth, upload.array('images', 5), addProductImages);
router.post('/products/reviews', checkAuth, addReview);

// Read
router.get('/products/flash-sales', getFlashSalesProducts);
router.get('/products/best-sellers', getBestSellers);

router.get('/products/category/*', getProductsByCategory);

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.get('/products/reviews/:id', getUserReviews);

// Update
router.patch('/products/:id', checkAuth, updateProductValidation, handleErrors, updateProduct);
router.patch('/products/images/:id', checkAuth, upload.array('images', 5), addProductImages);

// Delete
router.delete('/products/:id', checkAuth, deleteProduct);

export default router;