import express from 'express';

import { addToCart, getUserCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/cart', addToCart);
router.get('/cart/:userId', getUserCart);

export default router;
