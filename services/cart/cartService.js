import CartModel from '../../models/Cart.js';

import { CustomError } from '../../utils/index.js';

export const addToCartService = async ({ sessionId, userId, productId, quantity }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId });
    } else if (sessionId) {
        cart = await CartModel.findOne({ sessionId });
    } else {
        throw new CustomError(400, 'Session ID is missing');
    }

    if (!cart) {
        cart = new CartModel({
            userId,
            sessionId,
            products: [{ productId, quantity }],
        });
    } else {
        const productIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId,
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }

    const updatedCart = await cart.save();

    if (!updatedCart) {
        throw new CustomError(400, 'Failed to add product');
    }

    return updatedCart;
};

export const updateCartAfterAuthService = async (sessionId, userId) => {
    const cart = await CartModel.findOne({ sessionId });

    if (cart) {
        cart.userId = userId;
        cart.sessionId = null;
        await cart.save();
    }
};

export const getUserCartService = async ({ sessionId, userId }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId })
            .select('-__v -createAt -updatedAt')
            .populate('products.productId');
    } else if (sessionId) {
        cart = await CartModel.findOne({ sessionId })
            .select('-__v -createAt -updatedAt')
            .populate('products.productId');
    } else {
        throw new CustomError(400, 'Either userId or sessionId must be provided');
    }

    if (!cart) {
        throw new CustomError(404, 'Cart not found');
    }

    return cart;
};