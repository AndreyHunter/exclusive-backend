import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discountedPrice: {
            type: Number,
            default: null,
        },
        category: {
            type: String,
            required: true,
            default: '',
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviewsCount: {
            type: Number,
            default: 0,
        },
        images: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Product', ProductSchema);