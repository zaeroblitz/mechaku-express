const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("Cart_Item", cartItemSchema);

module.exports = CartItem;
