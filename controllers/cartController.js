import {
    addToCartService,
    getUserCartService,
    getUserCartIdsService,
    updateUserCartItemsQuantityService,
    deleteProductFromCartService,
} from '../services/cart/cartService.js';

export const addToCart = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const cart = await addToCartService({ ...req.body, sessionId });

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
        const cart = await getUserCartService({ userId: req.query.userId, sessionId });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const getUserCartIds = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const cart = await getUserCartIdsService({ userId: req.query.userId, sessionId });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const updateUserCartItemsQuantity = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const { userId, products } = req.body;
        const cart = await updateUserCartItemsQuantityService({ sessionId, userId, products });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const sessionId = req.cookies.sessionId;
        const { userId, productId } = req.query;
        const cart = await deleteProductFromCartService({ sessionId, userId, productId });
        res.json(cart);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};
