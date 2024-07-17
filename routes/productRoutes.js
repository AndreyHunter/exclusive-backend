import express from 'express';

import {
    createProduct,
    addProductImages,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

import { productValidation } from '../validations/productValidation.js';
import { handleErrors } from '../utils/handleErrors.js';
import upload from '../s3Config.js';

const router = express.Router();

router.post('/products', productValidation, handleErrors, createProduct);
router.post('/products/images/:id', upload.array('images', 10), addProductImages);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.patch('/products/:id', productValidation, handleErrors, updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
