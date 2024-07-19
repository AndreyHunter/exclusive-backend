import { addToCartService, getUserCartService } from '../services/cartService.js';

export const addToCart = async (req, res) => {
    try {
        const cart = await addToCartService(req.body);

        res.json({
            message: 'Product successfully added to cart',
            cart,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const cart = await getUserCartService(req.params.userId);
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
