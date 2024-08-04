import { CartService } from '../services/index.js';

export const addToCart = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const cart = await CartService.addToCart({ ...req.body, sessionId });

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
        const sessionId = req.cookies.sessionId;
        const cart = await CartService.getUserCart({
            userId: req.query.userId,
            sessionId,
            details: req.query.details,
        });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const updateUserCartItemsQuantity = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const { userId, products } = req.body;
        const cart = await CartService.updateUserCartItemsQuantity({
            sessionId,
            userId,
            products,
        });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const { userId, productId } = req.query;
        const cart = await CartService.deleteProductFromCart({
            sessionId,
            userId,
            productId,
        });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
