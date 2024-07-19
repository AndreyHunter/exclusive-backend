import { addToWishListService, getUserWishListService } from '../services/wishListService.js';

export const addToWishList = async (req, res) => {
    try {
        const wishList = await addToWishListService(req.body);
        res.json({ message: 'Product successfully added to wishlist', wishList });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getUserWishList = async (req, res) => {
    try {
        const wishList = await getUserWishListService(req.params.userId);
        res.json(wishList);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

