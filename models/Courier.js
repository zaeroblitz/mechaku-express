const mongoose = require("mongoose");

const courierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

const CourierModel = mongoose.model("Courier", courierSchema);

module.exports = CourierModel;
