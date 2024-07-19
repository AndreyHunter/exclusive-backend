import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { MONGO_URI, PORT } from './constants/index.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouters from './routes/cartRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRouters);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.log(err));

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is running on port: ${PORT}`);
    }
});
