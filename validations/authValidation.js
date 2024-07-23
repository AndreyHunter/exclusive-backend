import { body } from 'express-validator';

const isValidContact = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{9,15}$/;

    if (!emailPattern.test(value) && !phonePattern.test(value)) {
        throw new Error('Invalid email or phone format');
    }

    return true;
};

export const signUpValidation = [
    body('name')
        .isLength({ min: 2, max: 60 })
        .withMessage('Name must be between 2 and 60 characters'),
    body('contact').custom(isValidContact).withMessage('Incorrect email or phone format'),
    body('password')
        .isLength({ min: 4, max: 80 })
        .withMessage('Password must be between 4 and 80 characters'),
];

export const signInValidation = [
    body('contact').custom(isValidContact).withMessage('Incorrect email or phone format'),
    body('password')
        .isLength({ min: 4, max: 80 })
        .withMessage('Password must be between 4 and 80 characters'),
];
