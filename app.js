const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const formData = require("express-form-data");
const os = require("os");

const { url } = require("./config");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const brandsRouter = require("./routes/brands");
const categoriesRouter = require("./routes/categories");
const gradesRouter = require("./routes/grades");
const productsRouter = require("./routes/products");
const transactionRouter = require("./routes/transaction");
const transactionStatusRouter = require("./routes/transaction_status");

const app = express();

app.use(cors());
// app.use(formData.parse());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(url);

app.use("/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/brand", brandsRouter);
app.use("/api/category", categoriesRouter);
app.use("/api/grade", gradesRouter);
app.use("/api/product", productsRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/transaction-status", transactionStatusRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
