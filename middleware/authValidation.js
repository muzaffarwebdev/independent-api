// middleware/authValidation.js
const { body, validationResult } = require('express-validator');

//validateSignup
const validateSignup = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .trim()
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password is required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

// validateLogin
const validateLogin = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .trim()
        .isString()
        .withMessage("Password must be a string")
        .notEmpty()
        .withMessage("Password is required"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = { validateSignup, validateLogin }