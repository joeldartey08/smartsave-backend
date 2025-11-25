const { check } = require("express-validator");

const validateSignUp = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateSignin = [
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const emailValidator = [
    check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("Email is required")
];

const passWordValidator = [
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    check("code").notEmpty()
    .withMessage("validation code is required")
]
module.exports = { validateSignUp, validateSignin, emailValidator, passWordValidator };
