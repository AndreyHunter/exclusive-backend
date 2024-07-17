import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: false,
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
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Product', ProductSchema);
