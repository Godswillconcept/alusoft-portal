const { body } = require("express-validator");
const checkValidationResult = require("./checkValidationResult");

const instructorValidator = [
  body("title").notEmpty().isString().trim().bail().withMessage("Please enter a valid title"),
  body("surname").notEmpty().isString().trim().bail().withMessage("Please enter a valid surname"),
  body("first_name").notEmpty().isString().trim().bail().withMessage("Please enter a valid first name"),
  body("other_name").notEmpty().isString().trim().bail().withMessage("Please enter a valid other name"),
  body("gender").notEmpty().isIn(["male", "female", "others"]).bail().withMessage("Please enter a valid gender"),
  body("email").notEmpty().isEmail().trim().normalizeEmail().bail().withMessage("Please enter a valid email"),
  body("address").isAlphanumeric().trim().withMessage("Please enter a valid address"),
  body("phone").notEmpty().isNumeric().isLength({ min: 11, max: 11 }).bail().withMessage("Please enter a valid phone number"),
  body("dob").notEmpty().isISO8601().bail().withMessage("Please enter a valid date of birth"),
  body("employment_date").notEmpty().isISO8601().bail().withMessage("Please enter a valid date of employment"),
  body("password").notEmpty().isAlphanumeric().isStrongPassword().isLength({ min: 6 }).trim().bail().withMessage("Please enter a valid password"),
  body("status").notEmpty().isIn(['active', 'inactive']).bail().withMessage("Please enter a valid status"),
  checkValidationResult,
];

module.exports = instructorValidator;
