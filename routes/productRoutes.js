import express from 'express';

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

import { handleErrors } from '../utils/handleErrors.js';
import { productValidation } from '../validations/productValidation.js';

const router = express.Router();

router.post('/products', productValidation, handleErrors, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.patch('/products/:id', productValidation, handleErrors, updateProduct);
router.delete('products/:id', deleteProduct);

export default router;