const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "onCart",
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("Cart_Item", cartItemSchema);

module.exports = CartItem;
