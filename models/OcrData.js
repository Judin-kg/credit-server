const mongoose = require("mongoose");

const OcrSchema = new mongoose.Schema(
  {
    rawText: {
      type: String,
      required: true,
    },
    customers: [
      {
        name: String,
        phone: String,
        totalCredit: Number,
        paid: Number,
        balance: Number,
        dueDate: Date,
        status: String,
      },
    ],
    source: {
      type: String,
      default: "photo",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OcrData", OcrSchema);