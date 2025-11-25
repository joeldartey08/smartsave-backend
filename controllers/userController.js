const { User, SavingPlan, Transaction } = require("../models");
const calculateNextDate = require("../utils/calculateDate");

const getDashboard = async (req, res, next) => {
  try {
    const { id } = req.user;

    const transactions = await Transaction.find({ user: id });
    const user = await User.findById({ _id: id }).select("-password");
    const plan = await SavingPlan.find({ user: id });

    const approvedTransaction = transactions.filter(
      (e) => e.status === "verified"
    );
    const pendingTransaction = transactions.filter(
      (e) => e.status === "pending"
    );

    const activePlans = plan.filter((e) => e.status === "active");
    const totalSaved = plan.reduce((sum, p) => sum + (p.amountSaved || 0), 0);
    const totalPaid = approvedTransaction.reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      status: true,
      message: "ok",
      data: {
        user: user,
        activePlans: activePlans.length,
        approvedTransactions: approvedTransaction.length,
        totalSaved: totalSaved,
        totalPaid: totalPaid,
        pendingTransaction: pendingTransaction.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// user profile
const currentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById({
      _id: id,
    }).select("_id name email isVerified role createdAt updatedAt");

    if (!user) {
      res.code = 401;

      throw new Error("user not found");
    }

    // const plans = await SavingPlan.findById()

    res.status(200).json({
      status: true,
      code: 200,
      message: "profile accessed",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, email } = req.body;

    const user = await User.findById({ _id: id }).select(
      "_id name email isVerified role createdAt updatedAt"
    );

    if (!user) {
      res.code = 404;

      throw new Error("user not found");
    }
    if (!name && !email) {
      res.code = 404;

      throw new Error("nothing to update");
    }

    if (email && email === user.email) {
      res.code = 400;

      throw new Error("email already existing");
    }

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;

    if (email) {
      user.isVerified = false;
    }
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
// saving plans
const createSavingPlan = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { planType, amount, startDate, planName, target } = req.body;

    const nextDate = calculateNextDate(startDate, planType);

    const savingPlan = new SavingPlan({
      user: id,
      planType,
      amount: parseInt(amount),
      nextReminder: nextDate,
      startDate,
      planName,
      target: parseInt(target),
    });
    await savingPlan.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "plan successfully created",
      data: {
        savingPlan: {
          planId: savingPlan._id,
          planName,
          amount,
          planType,
          startDate,
          target,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllplans = async (req, res, next) => {
  try {
    const { id } = req.user;

    const plans = await SavingPlan.find({ user: id }).sort({ createdAt: -1 });

    if (!plans.length) {
      res.status(200).json({
        code: 200,
        status: true,
        message: "your request was successfull",
        data: [],
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "your request was successfull",
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

// transactions
const createTransactions = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { planId, proofUrl, amount } = req.body;

    const plan = await SavingPlan.findById({ _id: planId });

    if (!plan) {
      res.code = 404;

      throw new Error("Invalid plan Id");
    }

    if (plan.user.toString() !== id) {
      res.code = 401;

      throw new Error(
        "You are not authorized to add transactions to this plan"
      );
    }

    const transaction = new Transaction({
      planId,
      user: id,
      proofUrl,
      amount,
    });
    await transaction.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "Your transaction has been sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const { id } = req.user;

    const transactions = await Transaction.find({ user: id }).sort({
      createdAt: -1,
    });

    if (!transactions.length) {
      res.status(200).json({
        code: 200,
        status: true,
        message: "your request was successfull",
        data: [],
      });
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "your request was successfull",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  currentUser,
  updateProfile,
  createSavingPlan,
  createTransactions,
  getAllplans,
  getAllTransactions,
  getDashboard,
};
