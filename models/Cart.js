import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            max: 1000,
            default: 1,
        },
    },
    {
        _id: false,
    },
);

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        sessionId: {
            type: String,
        },
        products: {
            type: [CartItemSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Cart', CartSchema);