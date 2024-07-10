import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SECRET_KEY } from '../constants/index.js';
import { CustomError } from '../utils/index.js';

import UserModel from '../models/User.js';

export const signUpService = async ({ name, email, password }) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new CustomError(400, 'User with this email is already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        name,
        email,
        password: hashedPassword,
    });

    const user = await doc.save();

    const token = jwt.sign(
        {
            id: user._id,
        },
        SECRET_KEY,
        {
            expiresIn: '30d',
        },
    );

    return {
        name: user.name,
        email: user.email,
        token,
    };
};

export const signInService = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        throw new CustomError(400, 'Password error');
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        SECRET_KEY,
        {
            expiresIn: '30d',
        },
    );

    return {
        name: user.name,
        email: user.email,
        token,
    };
};