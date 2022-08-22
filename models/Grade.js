const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: String,
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
