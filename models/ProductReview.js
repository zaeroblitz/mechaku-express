const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const productReviewSchema = new Schema({
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
});

const ProductReview = mongoose.model("ProductReview", productReviewSchema);

module.exports = ProductReview;
