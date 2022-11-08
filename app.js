const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createError = require("http-errors");

require("dotenv").config();

const ProductRoute = require("./api/routes/products");
const ProductRouteSearch = require("./api/routes/search");
const ChatBotRoute = require("./api/routes/ChatBot");
const userRoutes = require("./api/routes/user");

mongoose
  .connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_USER_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log(
      "Connecting to Database " + process.env.DB_NAME + "...Please wait."
    );
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + process.env.DB_NAME);
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected...");
});

//Terminated with Ctrl+c
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose connection is disconnected due to app termination..."
    );
    process.exit(0);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
//Public folder uploads
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should handle requests
app.use("/Products", ProductRoute);
app.use("/Search", ProductRouteSearch);
//Chatbot
app.use("/Chatbot", ChatBotRoute);
//Login
app.use("/User", userRoutes);

app.use((req, res, next) => {
  /*const error = new Error("Not found");
  error.status = 404;
  next(error);*/
  next(createError(404, "Not found"));
});

//Error Hundler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
