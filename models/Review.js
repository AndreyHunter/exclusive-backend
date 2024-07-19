import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
    },
    comment: {
        type: String,
        default: '',
    },
});

export default mongoose.model('Review', ReviewSchema);
