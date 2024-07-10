import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { SECRET_KEY } from '../constants/index.js';
import { signUpService, signInService } from '../services/userService.js';

export const signup = async (req, res) => {
    try {
        const user = await signUpService(req.body);
        res.json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        const user = await signInService(req.body);
        res.json(user);
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};