const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart_item",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  courier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courier",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  value: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  transactionStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction_Status",
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
