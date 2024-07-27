import jwt from 'jsonwebtoken';

import { Config } from '../constants/index.js';
import { CustomError } from '../utils/index.js';

import UserModel from '../models/User.js';

const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            throw new CustomError(401, 'Authorization token is missing');
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, Config.SECRET_KEY);
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            throw new CustomError(404, 'User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            err.statusCode = 401;
            err.message = 'Invalid token';
        }

        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export default checkAuth;