const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    planType: { type: String, enum: ["daily", "weekly", "monthly", "yearly"] },
    planName: String,
    target: Number,
    amount: Number,
    startDate: Date,
    nextReminder: Date,
    lastReminder: Date,
    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },
    totalSaved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SavingPlan = mongoose.model("SavingsPlan", savingSchema);

module.exports = SavingPlan;
