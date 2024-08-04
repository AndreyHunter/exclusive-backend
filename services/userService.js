import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Config } from '../constants/index.js';
import { HttpError } from '../utils/index.js';

import UserModel from '../models/User.js';

export const signUp = async ({ name, contact, password }) => {
    const existingUser = await UserModel.findOne({ contact });

    if (existingUser) {
        throw new HttpError(400, 'User with this email is already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        name,
        contact,
        password: hashedPassword,
    });

    const user = await doc.save();

    const token = jwt.sign(
        {
            _id: user._id,
        },
        Config.SECRET_KEY,
        {
            expiresIn: '30d',
        },
    );

    return {
        _id: user._id,
        name: user.name,
        contact: user.contact,
        token,
    };
};

export const signIn = async ({ contact, password }) => {
    const user = await UserModel.findOne({ contact });

    if (!user) {
        throw new HttpError(404, 'User not found');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        throw new HttpError(400, 'Password error');
    }

    const token = jwt.sign(
        {
            _id: user._id,
        },
        Config.SECRET_KEY,
        {
            expiresIn: '30d',
        },
    );

    return {
        _id: user._id,
        name: user.name,
        contact: user.contact,
        token,
    };
};
