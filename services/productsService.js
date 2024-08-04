import ProductModel from '../models/Product.js';
import ProductInfoModel from '../models/ProductInfo.js';
import ReviewModel from '../models/Review.js';

import { HttpError } from '../utils/index.js';

// Create
export const createProduct = async (productData) => {
    const product = ProductModel(productData);
    await product.save();

    const productInfo = new ProductInfoModel({
        productId: product._id,
        ...productData,
    });

    await productInfo.save();

    return product;
};

export const addProductImages = async (images, productId) => {
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    product.images = images;

    await product.save();

    return product;
};

export const addReview = async ({ productId, userId, rating, comment }) => {
    const product = await ProductModel.findById(productId);

    if (!product) {
        throw new HttpError(404, 'Product not found');
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

// Read
export const getProducts = async ({ limit = 20, sort = '' }) => {
    const query = ProductModel.find().select('-__v -createdAt -updatedAt');

    if (sort) {
        const [field, order] = sort.split(':');
        query.sort({ [field]: Number(order) });
    }

    if (limit) query.limit(Number(limit));

    const products = await query;

    return products;
};

export const getProduct = async (productId) => {
    const product = await ProductModel.findById(productId).select('-__v -createdAt -updatedAt');
    const productInfo = await ProductInfoModel.findOne({ productId }).select('-__v -productId');

    if (!product && !productInfo) {
        throw new HttpError(404, 'Product not found');
    }

    return {
        ...product.toObject(),
        ...productInfo.toObject(),
    };
};

export const getProductsByCategory = async ({ categoryPath, limit = 20, sort = '' }) => {
    const query = ProductModel.find({ category: new RegExp(`^${categoryPath}`) }).select(
        '-__v -createdAt -updatedAt',
    );

    if (sort) {
        const [field, order] = sort.split(':');
        query.sort({ [field]: Number(order) });
    }

    if (limit) query.limit(Number(limit));

    const products = await query;

    if (!products.length) {
        throw new HttpError(404, 'Category not found or no products in this category');
    }

    return products;
};

export const getFlashSalesProducts = async ({ limit = 20, sort = '' }) => {
    const query = ProductModel.find({ discountedPrice: { $ne: null } }).select(
        '-__v -createdAt -updatedAt',
    );

    if (sort) {
        const [field, order] = sort.split(':');
        query.sort({ [field]: Number(order) });
    }

    if (limit) query.limit(Number(limit));

    const products = await query;

    if (!products.length) {
        throw new HttpError(404, 'Products not found');
    }

    return products;
};

export const getBestSellers = async ({ limit = 20, sort = '' }) => {
    const query = ProductModel.find()
        .sort({ reviewsCount: -1 })
        .select('-__v -createdAt -updatedAt');

    if (sort) {
        const [field, order] = sort.split(':');
        query.sort({ [field]: Number(order) });
    }

    if (limit) query.limit(Number(limit));

    const products = await query;

    if (!products.length) {
        throw new HttpError(404, 'Products not found');
    }

    return products;
};

export const getUserReviews = async (userId) => {
    const reviews = await ReviewModel.find({ userId });
    return reviews;
};

// Update
export const updateProduct = async (productId, updatedData) => {
    const product = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
    const productInfo = await ProductInfoModel.findOneAndUpdate({ productId }, updatedData, {
        new: true,
    });

    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    return {
        ...product.toObject(),
        ...productInfo.toObject(),
    };
};

// Delete
export const deleteProduct = async (productId) => {
    const product = await ProductModel.findByIdAndDelete(productId);
    await ProductInfoModel.findOneAndDelete({ productId });

    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    return product;
};
