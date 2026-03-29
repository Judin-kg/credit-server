const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    totalCredit: {
      type: Number,
      default: 0
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    dueDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending"
    },

    // optional (for OCR tracking)
    rawText: {
      type: String
    },
    source: {
      type: String,
      default: "ocr"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);