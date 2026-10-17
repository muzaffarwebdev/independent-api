// middleware/blogValidation.js
const { body, validationResult } = require('express-validator');

const blogValidation = [
    body('title')
        .if(( value, { req }) => req.method === 'POST' || value !== undefined )
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Title must be between 3 and 150 characters'),

    body('content')
        .if(( value, { req }) => req.method === 'POST' || value !== undefined )
        .isString()
        .withMessage('Content must be a string')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(error => error.msg)
            });
        }

        next();
    }
];

module.exports = blogValidation;