import express from 'express';

import { addToWishList, getUserWishList } from '../controllers/wishListController.js';

const router = express.Router();

router.post('/wishlist', addToWishList);
router.get('/wishlist/:userId', getUserWishList);

export default router;