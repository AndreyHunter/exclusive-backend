import mongoose from 'mongoose';

const ProductInfoSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    colors: {
        type: [String],
        required: false,
    },
    sizes: {
        type: [String],
        required: false,
    },
});

export default mongoose.model('ProductInfo', ProductInfoSchema);
