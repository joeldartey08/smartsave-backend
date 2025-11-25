const cron = require("node-cron");
const { SavingPlan } = require("../models/");
const calculateNextDate = require("../utils/calculateDate");
const sendReminderMail = require("../utils/sendMailreminder");

const planReminder = () => {
  cron.schedule("* */23 * * *", async () => {
    console.log("Running a task every minute");

    const today = new Date();
    const plans = await SavingPlan.find({
      nextReminder: { $lte: today },
    }).populate("user");

    for (const element of plans) {
      await sendReminderMail({
        subject: "MindSave Reminder — It's time to make your next deposit!",
        emailTo: element.user.email,
        content: `This is a friendly reminder that your Monthly Saving Plan of ${element.amount} is due today.Kindly make your payment and upload the receipt in your dashboard.`,
        name: element.user.name,
        footer: "– MindSave Team 💡",
      });
      element.lastReminder = today;
      const newDate = calculateNextDate(today, element.planType);
      element.nextReminder = newDate;

      await element.save();
    }
  });
};

module.exports = planReminder;
