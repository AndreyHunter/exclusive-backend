import CartModel from '../../models/Cart.js';
import { CustomError } from '../../utils/index.js';

export const addToCartService = async ({ sessionId, userId, productId, quantity }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId });
    }

    if (!cart && sessionId) {
        cart = await CartModel.findOne({ sessionId, userId: null });
    }

    if (!cart) {
        cart = new CartModel({
            userId: userId || null,
            sessionId: sessionId || null,
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

    return updatedCart.products;
};

export const updateCartAfterAuthService = async ({ sessionId, userId }) => {
    const sessionCart = await CartModel.findOne({ sessionId, userId: null });
    const userCart = await CartModel.findOne({ userId });

    if (sessionCart) {
        if (userCart) {
            sessionCart.products.forEach((sessionCartProduct) => {
                const productIndex = userCart.products.findIndex(
                    (userCartProduct) =>
                        userCartProduct.productId.toString() ===
                        sessionCartProduct.productId.toString(),
                );

                if (productIndex > -1) {
                    userCart.products[productIndex].quantity += sessionCartProduct.quantity;
                } else {
                    userCart.products.push(sessionCartProduct);
                }
            });

            await userCart.save();
            await CartModel.deleteOne({ sessionId, userId: null });
        } else {
            sessionCart.userId = userId;
            sessionCart.sessionId = null;
            await sessionCart.save();
        }
    }

    const updatedCart = userCart || sessionCart;
    return updatedCart ? updatedCart.products : [];
};

export const getUserCartService = async ({ sessionId, userId, details = false }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId });
    } else if (sessionId) {
        cart = await CartModel.findOne({ sessionId, userId: null });
    } else {
        throw new CustomError(400, 'Either userId or sessionId must be provided');
    }

    if (!cart) {
        return [];
    }

    if (details) {
        await cart.populate({
            path: 'products.productId',
            select: '-__v -createdAt -updatedAt',
        });

        const productWithDetails = cart.products.map((product) => ({
            product: product.productId,
            quantity: product.quantity,
        }));

        return productWithDetails;
    }

    return cart.products;
};

export const updateUserCartItemsQuantityService = async ({ sessionId, userId, products }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId });
    } else if (sessionId) {
        cart = await CartModel.findOne({ sessionId, userId: null });
    }

    if (!cart) {
        throw new CustomError(404, 'Cart was not found');
    }

    cart.products = products.map((product) => ({
        productId: product.product._id,
        quantity: product.quantity,
    }));

    await cart.populate({ path: 'products.productId', select: '-__v -createdAt -updatedAt' });
    await cart.save();

    if (!cart) {
        throw new CustomError(400, 'Cart was not updated');
    }

    const productWithDetails = cart.products.map((product) => ({
        product: product.productId,
        quantity: product.quantity,
    }));

    return productWithDetails;
};

export const deleteProductFromCartService = async ({ sessionId, userId, productId }) => {
    let cart;

    if (userId) {
        cart = await CartModel.findOne({ userId });
    } else if (sessionId) {
        cart = await CartModel.findOne({ sessionId, userId: null });
    }

    if (!cart) {
        throw new CustomError(404, 'Cart was not found');
    }

    cart.products = cart.products.filter((product) => product.productId.toString() !== productId);

    await cart.populate({ path: 'products.productId', select: '-__v -createdAt -updatedAt' });
    await cart.save();

    if (!cart) {
        throw new CustomError(400, 'Product was not deleted');
    }

    const productWithDetails = cart.products.map((product) => ({
        product: product.productId,
        quantity: product.quantity,
    }));

    return productWithDetails;
};
