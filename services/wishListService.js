import WishListModel from '../models/WishList.js';

import { CustomError } from '../utils/index.js';

export const addToWishListService = async ({ userId, productId }) => {
    let wishList = await WishListModel.findOne({ userId });

    if (!wishList) {
        wishList = new WishListModel({
            userId,
            products: [{ productId }],
        });
    } else {
        const updatedWishList = await WishListModel.findOneAndUpdate(
            { userId },
            { $addToSet: { products: { productId } } },
            { new: true },
        );

        if (!updatedWishList) {
            throw new CustomError(400, 'Failed to add product to wish list');
        }

        return updatedWishList;
    }

    const savedWishList = await wishList.save();

    if (!savedWishList) {
        throw new CustomError(400, 'Failed to add product to wish list');
    }

    return savedWishList;
};

export const getUserWishListService = async (userId) => {
    const wishList = await WishListModel.findOne({ userId })
        .select('-__v')
        .populate('products.productId');
    if (!wishList) {
        throw new CustomError(404, 'Product not found');
    }
    return wishList;
};
