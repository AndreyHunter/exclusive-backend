import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../constants/index.js';

import UserModel from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email is already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name,
            email,
            password: hashed,
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

        res.json({
            name: user._doc.name,
            email: user._doc.email,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration error' });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not fount' });
        }

        const isExistingPass = await bcrypt.compare(password, user._doc.password);

        if (!isExistingPass) {
            return res.status(400).json({ message: 'Password Error' });
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

        res.json({
            name: user._doc.name,
            email: user._doc.email,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration error' });
    }
};
