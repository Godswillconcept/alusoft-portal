const {body} = require('express-validator');
const checkValidationResult = require('./checkValidationResult');

const paymentValidator = [
    body('student_id').notEmpty().isNumeric().bail().withMessage('Student ID is required'),
    body('programme_id').notEmpty().isNumeric().bail().withMessage('Programme ID is required'),
    body('amount').notEmpty().isNumeric().bail().withMessage('Amount is required'),
    body('payment_date').notEmpty().isISO8601().bail().withMessage('Payment date is required'),
    body('payment_method').notEmpty().isIn(["cash", "bank_transfer", "cheque", "other"]).bail().withMessage('Payment method is required'),
    checkValidationResult
];

module.exports = paymentValidator;