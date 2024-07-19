import CartModel from '../models/Cart.js';

import { CustomError } from '../utils/index.js';

export const addToCartService = async ({ userId, productId, quantity }) => {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
        cart = new CartModel({
            userId,
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

export const getUserCartService = async (userId) => {
    const cart = await CartModel.findOne({ userId }).select('-__v').populate('products.productId');
    if (!cart) {
        throw new CustomError(404, 'Cart not found');
    }
    return cart;
};
