import WishListModel from '../models/WishList.js';

import { HttpError } from '../utils/index.js';

export const addToWishList = async ({ userId, productId }) => {
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
            throw new HttpError(400, 'Failed to add product to wish list');
        }

        return updatedWishList;
    }

    const savedWishList = await wishList.save();

    if (!savedWishList) {
        throw new HttpError(400, 'Failed to add product to wish list');
    }

    return savedWishList;
};

export const getUserWishList = async (userId) => {
    const wishList = await WishListModel.findOne({ userId })
        .select('-__v')
        .populate('products.productId');

    if (!wishList) {
        throw new HttpError(404, 'WishList not found');
    }

    return wishList;
};
