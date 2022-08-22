const TransactionStatus = require("../models/TransactionStatus");

module.exports = {
  postTransactionStatusHandler: async (req, res) => {
    try {
      const { name } = req.body;

      const transactionStatus = await TransactionStatus.create({ name });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully add new transaction status",
        data: transactionStatus,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllTransactionStatusHandler: async (req, res) => {
    try {
      const transactionStatus = await TransactionStatus.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully update selected transaction status",
        data: transactionStatus,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getTransactionStatusByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;

      const transactionStatus = await TransactionStatus.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully update selected transaction status",
        data: transactionStatus,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  putTransactionStatusHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;

      await TransactionStatus.findByIdAndUpdate(id, { name });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully update selected transaction status",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteTransactionStatusHandler: async (req, res) => {
    try {
      const id = req.params.id;

      await TransactionStatus.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully remove selected transaction status",
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
