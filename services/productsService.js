import ProductModel from '../models/Product.js';
import ProductInfoModel from '../models/ProductInfo.js';
import ReviewModel from '../models/Review.js';

import { CustomError } from '../utils/index.js';

export const createProductService = async (productData) => {
    const product = ProductModel(productData);
    const savedProduct = await product.save();

    const productInfo = new ProductInfoModel({
        productId: savedProduct._id,
        description: productData.description,
        sizes: productData.sizes,
        colors: productData.colors,
    });

    await productInfo.save();

    return savedProduct;
};

export const addProductImagesService = async (images, productId) => {
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    product.images = images;

    await product.save();

    return product;
};

export const addReviewService = async ({ productId, userId, rating, comment }) => {
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    const review = new ReviewModel({
        productId,
        userId,
        rating,
        comment,
    });

    await review.save();

    const reviews = await ReviewModel.find({ productId });
    const avengerRating =
        reviews.reduce((sum, review) => {
            return sum + review.rating;
        }, 0) / reviews.length;

    product.rating = avengerRating;
    product.reviewsCount = reviews.length;
    await product.save();

    return review;
};

export const getUserReviewsService = async (userId) => {
    const reviews = await ReviewModel.find({ userId });
    return reviews;
};

export const getProductsService = async () => {
    const products = await ProductModel.find().select('-__v -createdAt -updatedAt');
    return products;
};

export const getProductService = async (productId) => {
    const product = await ProductModel.findById(productId).select('-__v -createdAt -updatedAt');
    const productInfo = await ProductInfoModel.findOne({ productId }).select('-__v -productId');

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    return {
        ...product.toObject(),
        ...productInfo.toObject(),
    };
};

export const updateProductService = async (productId, updatedData) => {
    const product = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
    const productInfo = await ProductInfoModel.findOneAndUpdate({ productId }, updatedData, {
        new: true,
    });

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    return {
        ...product.toObject(),
        ...productInfo.toObject(),
    };
};

export const deleteProductService = async (productId) => {
    const product = await ProductModel.findByIdAndDelete(productId);
    await ProductInfoModel.findOneAndDelete({ productId });

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    return product;
};
