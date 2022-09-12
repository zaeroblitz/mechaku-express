const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const TransactionStatus = require("../models/TransactionStatus");

module.exports = {
  postTransactionHandler: async (req, res) => {
    try {
      const {
        user,
        address,
        products,
        courier,
        payment,
        value,
        tax,
        transactionStatus,
      } = req.body;

      const transaction = await Transaction.create({
        user,
        address,
        products,
        courier,
        payment,
        value,
        tax,
        transactionStatus,
      });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully add new transaction",
        data: transaction,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllTransactionHandler: async (req, res) => {
    try {
      const transactions = await Transaction.find()
        .populate("user")
        .populate("product")
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get all transaction",
        data: transactions,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllTransactionByUserHandler: async (req, res) => {
    try {
      const userId = req.query.userId;

      const transactions = await Transaction.find({
        user: userId,
      })
        .populate("user")
        .populate("product")
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get all transaction by user",
        data: transactions,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getTransactionByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;

      const transaction = await Transaction.findById(id)
        .populate("user")
        .populate("product")
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected transaction by id",
        data: transaction,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
};
