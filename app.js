const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const createError = require("http-errors");

const ProductRoute = require("./api/routes/products");
const ProductRouteSearch = require("./api/routes/search");
const ChatbotRoute = require("./api/routes/chatbot");

mongoose
  .connect("mongodb+srv://cluster0.edcw4wv.mongodb.net/", {
    dbName: "RESTfulAPI_Homezy",
    user: "SKGTEAMA",
    pass: "mmLU4bvWUCknpFRe",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("Connecting to Database....");
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB RESTfulAPI_Homezy...");
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

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
//Public folder uploads
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/Products", ProductRoute);
app.use("/Search", ProductRouteSearch);
app.use("/Chatbot", ChatbotRoute);

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
