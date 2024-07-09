import { body } from 'express-validator';

export const signUpValidation = [
    body('name')
        .isLength({ min: 4, max: 60 })
        .withMessage('Name must be between 4 and 60 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 4, max: 80 })
        .withMessage('Password must be between 4 and 80 characters'),
];

export const signInValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 4, max: 80 })
        .withMessage('Password must be between 4 and 80 characters'),
];
