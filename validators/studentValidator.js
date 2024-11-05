const {body} = require('express-validator');
const checkValidationResult = require('./checkValidationResult');

const studentValidator = [
    body('surname').notEmpty().isString().trim().bail().withMessage('Surname is required'),
    body('first_name').notEmpty().isString().trim().bail().withMessage('First name is required'),
    body('other_name').notEmpty().isString().trim().bail().withMessage('Other name is required'),
    body('email').notEmpty().normalizeEmail().isEmail().trim().bail().withMessage('Email is required'),
    body('phone').notEmpty().isMobilePhone('en-NG').isLength({min: 11, max: 11}).trim().bail().withMessage('Phone is required'),
    body('address').notEmpty().isString().trim().bail().withMessage('Address is required'),
    body('dob').notEmpty().isDate().trim().bail().withMessage('Date of birth is required'),
    body('gender').notEmpty().isIn(['male', 'female']).trim().bail().withMessage('Gender is required'),
    body('guardian_name').notEmpty().isString().trim().bail().withMessage('Guardian name is required'),
    body('guardian_phone').notEmpty().isMobilePhone('en-NG').trim().bail().withMessage('Guardian phone is required'),
    body('guardian_email').notEmpty().isEmail().trim().bail().withMessage('Guardian email is required'),
    body('guardian_address').notEmpty().isString().trim().bail().withMessage('Guardian address is required'),
    body('password').notEmpty().isLength({min: 6}).isStrongPassword().trim().bail().withMessage('Password is required'),
    body('status').notEmpty().isIn(['active', 'inactive']).trim().bail().withMessage('Status is required'),
    checkValidationResult
];

module.exports = studentValidator;