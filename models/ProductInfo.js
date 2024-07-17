import mongoose from 'mongoose';

const ProductInfoSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    colors: {
        type: [String],
        default: [],
    },
    sizes: {
        type: [String],
        default: [],
    },
});

export default mongoose.model('ProductInfo', ProductInfoSchema);
