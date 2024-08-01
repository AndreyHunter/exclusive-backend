import express from 'express';

import {
    addToCart,
    getUserCart,
    getUserCartIds,
    updateUserCartItemsQuantity,
    deleteProductFromCart,
} from '../controllers/cartController.js';

import {
    cartIdValidation,
    updateCartItemsQuantityValidation,
} from '../validations/productValidation.js';
import { handleErrors } from '../middlewares/index.js';

const router = express.Router();

router.post('/cart', cartIdValidation, handleErrors, addToCart);
router.get('/cart', getUserCart);
router.get('/cart/ids', getUserCartIds);
router.put('/cart', updateCartItemsQuantityValidation, handleErrors, updateUserCartItemsQuantity);
router.delete('/cart', deleteProductFromCart);

export default router;
