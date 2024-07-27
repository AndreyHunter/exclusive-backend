import { body } from 'express-validator';

export const productValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    body('discountedPrice')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Discounted price must be a positive number'),
    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string'),
    body('inStock').optional().isBoolean().withMessage('InStock must be a boolean value'),
    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),
    body('reviewsCount')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Reviews count must be a non-negative integer'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('additionalDescription')
        .optional()
        .isString()
        .withMessage('additionalDescription must be a string'),
    body('characteristicsList')
        .optional()
        .isArray()
        .withMessage('CharacteristicsList must be an array of strings')
        .custom((characteristic) =>
            characteristic.every((characteristic) => typeof characteristic === 'string'),
        )
        .withMessage('Each characteristic must be a string'),
    body('colors')
        .optional()
        .isArray()
        .withMessage('Colors must be an array of strings')
        .custom((colors) => colors.every((color) => typeof color === 'string'))
        .withMessage('Each color must be a string'),
    body('sizes')
        .optional()
        .isArray()
        .withMessage('Sizes must be an array of strings')
        .custom((sizes) => sizes.every((size) => typeof size === 'string'))
        .withMessage('Each size must be a string'),
];

export const updateProductValidation = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('discountedPrice')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Discounted price must be a positive number'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('inStock').optional().isBoolean().withMessage('InStock must be a boolean value'),
    body('rating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),
    body('reviewsCount')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Reviews count must be a non-negative integer'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('additionalDescription')
        .optional()
        .isString()
        .withMessage('additionalDescription must be a string'),
    body('characteristicsList')
        .optional()
        .isArray()
        .withMessage('CharacteristicsList must be an array of strings')
        .custom((characteristic) =>
            characteristic.every((characteristic) => typeof characteristic === 'string'),
        )
        .withMessage('Each characteristic must be a string'),
    body('colors')
        .optional()
        .isArray()
        .withMessage('Colors must be an array of strings')
        .custom((colors) => colors.every((color) => typeof color === 'string'))
        .withMessage('Each color must be a string'),
    body('sizes')
        .optional()
        .isArray()
        .withMessage('Sizes must be an array of strings')
        .custom((sizes) => sizes.every((size) => typeof size === 'string'))
        .withMessage('Each size must be a string'),
];

export const addToCartValidation = [
    body('productId')
        .notEmpty()
        .withMessage('productId is required')
        .isString()
        .withMessage('productId must be a string'),
];
