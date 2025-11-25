const { User } = require("../models");
const comparePassword = require("../utils/comparePassword");
const generateCode = require("../utils/generateCode");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const sendMail = require("../utils/sendMail");
const sendReminderMail = require("../utils/sendMailreminder");

const signupController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // existing user
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      res.code = 400;

      throw new Error("Email already existing");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // add to database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    await sendReminderMail({
      subject: "Welcome to SmartSave 🎉",
      content:
        "Welcome to SmartSave! Your account has been created successfully. Start saving smarter today — set goals, track progress, and grow your funds with ease.",
      footer: "– The SmartSave Team",
      name: name,
      emailTo: email,
    });

    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (!existinguser) {
      res.code = 400;

      throw new Error("invalid email or password");
    }

    const isMatch = await comparePassword(password, existinguser.password);

    if (isMatch === false) {
      res.code = 400;

      throw new Error("invalid credentials");
    }

    const token = generateToken(existinguser);

    res.status(200).json({
      code: 200,
      status: true,
      message: "User logged in successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;

      throw new Error("user not found");
    }

    const code = generateCode(6);

    user.forgotPasswordCode = code;
    await user.save();

    sendMail({
      subject: "[SaveSmart] Password Reset Code",
      content: "Your password verification code is ",
      code: code,
      emailTo: email,
    });

    res.status(200).json({
      status: true,
      code: 200,
      message: "Your password verification Code Has Been sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    console.log(code);

    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;

      throw new Error("User not found");
    }

    if (user.forgotPasswordCode !== code) {
      res.code = 400;

      throw new Error("Invalid code");
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    res.status(200).json({
      status: true,
      code: 200,
      message: "password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupController,
  signinController,
  forgetPasswordController,
  recoverPassword,
};
