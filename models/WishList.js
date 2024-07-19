import mongoose from 'mongoose';

const WishListItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { _id: false },
);

const WishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: {
        type: [WishListItemSchema],
        default: [],
    },
});

export default mongoose.model('WishList', WishListSchema);