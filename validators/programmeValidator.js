const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const programmeValidator = [
    body('name').notEmpty().isString().trim().bail().withMessage('Name is required'),
    body('description').isString().trim().bail().withMessage("Enter description here"),
    body('session').notEmpty().isIn(['morning', 'evening']).bail().withMessage('Session is required'),
    body('tuition').notEmpty().isNumeric().bail().withMessage('Tuition is required'),
    checkValidationResult
];

module.exports = programmeValidator;