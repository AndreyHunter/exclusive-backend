import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { Config } from './constants/index.js';

import { createSessionId } from './middlewares/index.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouters from './routes/cartRoutes.js';
import wishListRoutes from './routes/wishListRoutes.js';

import './services/cart/removeCartsByTime.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
);

app.use(
    session({
        secret: Config.SESSION_ID,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use(createSessionId);

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRouters);
app.use(wishListRoutes);

mongoose
    .connect(Config.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.log(err));

app.listen(Config.PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is running on port: ${Config.PORT}`);
    }
});
