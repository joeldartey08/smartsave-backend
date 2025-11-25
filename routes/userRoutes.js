const express = require("express");
const { userController } = require("../controllers");
const { isAuth } = require("../middleware");
const {
  updateProfileValiator,
  savingPlanValidator,
  transactionValidator,
} = require("../validate/userValidator");
const validate = require("../validate/validate");

const router = express.Router();

router.get("/profile", isAuth, userController.currentUser);

router.get("/dashboard", isAuth, userController.getDashboard)

router.put(
  "/edit-profile",
  isAuth,
  updateProfileValiator,
  validate,
  userController.updateProfile
);

//create saving plan and getting and updating saving plan
router.post(
  "/create-savings",
  isAuth,
  savingPlanValidator,
  validate,
  userController.createSavingPlan
);

router.get("/get-all-plans",isAuth, userController.getAllplans)


// transactions route
router.post(
  "/create-transaction",
  isAuth,
  transactionValidator,
  validate,
  userController.createTransactions
);

router.get("/get-all-transactions", isAuth, userController.getAllTransactions)

module.exports = router;
