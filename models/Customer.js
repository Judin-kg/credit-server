// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema(
//   {
//     company: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Company",
//       // required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     // balance: {
//     //   type: String,
//     //   required: true,
//     // },
//     dueDate: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },
//     email: String,
//     totalCredit: Number,
//     balance:Number,
//     dueAmount: Number,
//     paidAmount:Number,
//     // dueDate: Date,
//     // status: {
//     //   type: String,
//     //   enum: ["PAID", "PENDING"],
//     //   default: "PENDING",
//     // },

//     status: {
//   type: String,
//   enum: ["PAID", "PENDING", "paid", "pending"],
//   default: "PENDING",
// },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Customer", customerSchema);





// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phone: { type: String },
//     totalCredit: { type: Number, default: 0 },
//     paid: { type: Number, default: 0 },
//     balance: { type: Number, default: 0 },
//     dueDate: { type: Date },

//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Overdue"],
//       default: "Pending",
//     },

//     action: { type: String }, // optional
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Customer", customerSchema);







// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phone: { type: String },

//     totalCredit: { type: Number, default: 0 },
//     paid: { type: Number, default: 0 },
//     balance: { type: Number, default: 0 },

//     dueDate: { type: Date, default: null },

//     status: {
//       type: String,
//       enum: ["Pending", "Paid", "Overdue"],
//       default: "Pending",
//     },

//     action: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Customer", customerSchema);




const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  totalCredit: Number,
  paidAmount: Number,
  balance: Number,
  dueDate: String,
  status: String,
  
    // optional (for OCR tracking)
    rawText: {
      type: String
    },
    source: {
      type: String,
      default: "ocr"
    }
  
});

module.exports = mongoose.model("Customer", customerSchema);



