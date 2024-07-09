import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './constants/index.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/auth', userRoutes);

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