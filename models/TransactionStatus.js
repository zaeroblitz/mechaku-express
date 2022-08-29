const mongoose = require("mongoose");

const transactionStatus = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionStatus = mongoose.model(
  "Transaction_Status",
  transactionStatus
);

module.exports = TransactionStatus;
