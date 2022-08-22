const mongoose = require("mongoose");

const productDetailSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    images: [
      {
        type: String,
      },
    ],
    // reviews: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ProductReview",
    //   },
    // ],
  },
  { timestamps: true }
);

const ProductDetail = mongoose.model("Product_Detail", productDetailSchema);

module.exports = ProductDetail;
