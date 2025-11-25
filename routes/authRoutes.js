const express = require("express");
const { authController } = require("../controllers");
const {
  validateSignUp,
  validateSignin,
  emailValidator,
  passWordValidator,
} = require("../validate/auth");
const validate = require("../validate/validate");
const router = express.Router();

router.post(
  "/signup",
  validateSignUp,
  validate,
  authController.signupController
);

router.post(
  "/login",
  validateSignin,
  validate,
  authController.signinController
);

router.post(
  "/forget-password",
  emailValidator,
  validate,
  authController.forgetPasswordController
);

router.post(
  "/recover-password",
  passWordValidator,
  validate,
  authController.recoverPassword
);
module.exports = router;
