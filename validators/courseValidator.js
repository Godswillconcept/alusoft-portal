const {body} = require('express-validator');
const checkValidationResult = require('./checkValidationResult');

const courseValidator = [
    body('name').notEmpty().isString().trim().bail().withMessage('Please enter a valid course name'),
    body('description').isAlphanumeric().trim().bail().withMessage('Please enter a valid course description'),
    body('duration').notEmpty().isNumeric().trim().bail().withMessage('Please enter a valid course duration in weeks'),
    checkValidationResult

];

module.exports = courseValidator;