const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  value: {
    type: number,
  },
  tax: {
    type: number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  transactionStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction_Status",
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
