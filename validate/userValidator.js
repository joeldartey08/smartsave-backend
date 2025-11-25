const { check } = require("express-validator");
const validateEmail = require("./validateEmail");

const updateProfileValiator = [
  check("email").custom(async (email) => {
    if (email) {
      const isValid = validateEmail(email);

      if (!isValid) {
        throw "invalid email";
      }
    }
  }),
  check("name").notEmpty().withMessage("name is required"),
];

const savingPlanValidator = [
  check("planType").notEmpty().withMessage("planType is required"),
  check("amount").notEmpty().withMessage(" amount is required empty"),
  check("startDate")
    .notEmpty()
    .withMessage(" startDate should not be left empty"),
  check("target")
    .notEmpty()
    .withMessage(" target amount should not be left empty"),
];

const transactionValidator = [
  check("planId").notEmpty().withMessage("planId is required"),
  check("proofUrl").notEmpty().withMessage("proofUrl is required"),
  check("amount").notEmpty().withMessage("amount is required"),
];

module.exports = {
  updateProfileValiator,
  savingPlanValidator,
  transactionValidator
};
