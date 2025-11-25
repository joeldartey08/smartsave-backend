const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SavingsPlan",
      required: true,
    },
    proofUrl: String,
    amount: Number,
    status: { type: String, enum: ["pending", "verified"], default: "pending" },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
