import ProductModel from '../models/Product.js';
import ProductInfoModel from '../models/ProductInfo.js';

import { CustomError } from '../utils/index.js';

export const createProductService = async (ProductData) => {
    const product = ProductModel(ProductData);
    const savedProduct = await product.save();

    const productInfo = new ProductInfoModel({
        productId: savedProduct._id,
        description: ProductData.description,
        // another info
    });

    await productInfo.save();

    return savedProduct;
};

export const getProductsService = async () => {
    const products = await ProductModel.find();

    return products.map((product) => {
        const { createdAt, updatedAt, __v, ...productData } = product.toObject();
        return productData;
    });
};

export const getProductService = async (productId) => {
    const product = await ProductModel.findById(productId);
    const productInfo = await ProductInfoModel.findOne({ productId });

    if (!product) {
        throw new CustomError(404, 'Product not found');
    }

    const {
        createdAt: productCreatedAt,
        updatedAt: productUpdatedAt,
        __v: productVersion,
        ...productData
    } = product.toObject();

    const {
        createdAt: infoCreatedAt,
        updatedAt: infoUpdatedAt,
        productId: infoProductId,
        __v: infoVersion,
        ...productInfoData
    } = productInfo ? productInfo.toObject() : {};

    return {
        ...productData,
        ...productInfoData,
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
