import cron from 'node-cron';

import CartModel from '../../models/Cart.js';

const removeCartsByTime = async () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 30);

    try {
        await CartModel.deleteMany({
            userId: { $exists: false },
            createdAt: { $lt: expirationDate },
        });

    } catch (err) {
        console.error('Error removing expired carts:', err);
    }
};

cron.schedule('0 0 * * *', removeCartsByTime);