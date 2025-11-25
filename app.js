const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { authRoute, userRoute } = require("./routes");
const { errorHandler } = require("./middleware");
const mongooseConnect = require("./database/mongoDb");
const morgan = require("morgan");
const cors = require("cors");
const planReminder = require("./services/Planreminder");
dotenv.config();

// Allow your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// database connection
mongooseConnect();

// start schdule reminder
planReminder();

// error handler
app.use(errorHandler);

module.exports = app;
