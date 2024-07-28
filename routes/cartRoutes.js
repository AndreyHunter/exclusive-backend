import express from 'express';

import { addToCart, getUserCart, getUserCartIds } from '../controllers/cartController.js';
import { addToCartValidation } from '../validations/productValidation.js';
import { handleErrors } from '../middlewares/index.js';

const router = express.Router();

router.post('/cart', addToCartValidation, handleErrors, addToCart);
router.get('/cart', getUserCart);
router.get('/cart/ids', getUserCartIds);

export default router;
