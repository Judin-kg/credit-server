// const axios = require("axios");
// const Customer = require("../models/Customer");
// const MessageLog = require("../models/MessageLog");

// // 🔔 MANUAL REMINDER
// exports.sendManualReminder = async (req, res) => {
//   try {
//     const { customerId } = req.params;

//     const customer = await Customer.findById(customerId);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     const message = `Hello ${customer.name}, your payment of ₹${customer.balance} is due on ${customer.dueDate}. Please make the payment.`;

//     await axios.post("https://waichat.com/api/send", {
//       number: customer.phone,
//       type: "text",
//       message,
//       instance_id: "68E0E2878A990",
//       access_token: "68de6bd371bd8",
//     });

//     await MessageLog.create({
//       customerId: customer._id,
//       customerName: customer.name,
//       phone: customer.phone,
//       message,
//       status: "Sent",
//     });

//     res.json({ success: true, message: "Reminder sent successfully" });
//   } catch (error) {
//     console.error(error);

//     await MessageLog.create({
//       phone: req.body?.phone,
//       message: "Reminder failed",
//       status: "Failed",
//     });

//     res.status(500).json({ message: "Failed to send reminder" });
//   }
// };










// const axios = require("axios");
// const Customer = require("../models/Customer");
// const MessageLog = require("../models/MessageLog");

// // 🔔 MANUAL REMINDER
// exports.sendManualReminder = async (req, res) => {
//   try {

//     console.log("📩 Manual reminder request received");
//     console.log("➡️ Params:", req.params);

//     const { customerId } = req.params;

//     // =========================
//     // Fetch Customer
//     // =========================
//     const customer = await Customer.findById(customerId);

//     console.log("👤 Customer Data:");
//     console.log(customer);

//     if (!customer) {
//       console.log("❌ Customer not found");
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     // =========================
//     // Create Message
//     // =========================
//     const message = `Hello ${customer.name}, your payment of ₹${customer.balance} is due on ${customer.dueDate}. Please make the payment.`;

//     console.log("✉️ Generated Message:");
//     console.log(message);

//     // =========================
//     // WhatsApp API Payload
//     // =========================
//     const payload = {
//       number: customer.phone,
//       type: "text",
//       message,
//       instance_id: "68E0E2878A990",
//       access_token: "68de6bd371bd8",
//     };

//     console.log("📤 Sending WhatsApp API Request:");
//     console.log(payload);

//     // =========================
//     // Send WhatsApp Message
//     // =========================
//     const apiResponse = await axios.post(
//       "https://waichat.com/api/send",
//       payload
//     );

//     console.log("✅ WhatsApp API Response:");
//     console.log(apiResponse.data);

//     // =========================
//     // Save Message Log
//     // =========================
//     const logData = {
//       customerId: customer._id,
//       customerName: customer.name,
//       phone: customer.phone,
//       message,
//       status: "Sent",
//     };

//     console.log("📝 Saving Message Log:");
//     console.log(logData);

//     await MessageLog.create(logData);

//     console.log("✅ Message log saved");

//     res.json({
//       success: true,
//       message: "Reminder sent successfully",
//     });

//   } catch (error) {

//     console.error("❌ Error sending reminder:");
//     console.error(error);

//     console.log("⚠️ Saving failed message log");

//     await MessageLog.create({
//       phone: req.body?.phone,
//       message: "Reminder failed",
//       status: "Failed",
//     });

//     res.status(500).json({
//       message: "Failed to send reminder",
//     });
//   }
// };







const axios = require("axios");
const Customer = require("../models/Customer");
const MessageLog = require("../models/MessageLog");

// 🔔 MANUAL REMINDER
exports.sendManualReminder = async (req, res) => {
  try {

    console.log("📩 Manual reminder request received");
    console.log("➡️ Params:", req.params);

    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);

    console.log("👤 Customer Data:", customer);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 📞 Format phone number (India)
    let phone = String(customer.phone).replace(/\D/g, "");

    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }

    console.log("📞 Formatted Phone:", phone);

    // ✉️ Message
    const message = `Hello ${customer.name}, your payment of ₹${customer.balance} is due on ${customer.dueDate}. Please make the payment.`;

    console.log("✉️ Generated Message:", message);

    // 📤 WhatsApp payload
    const payload = {
      number: phone,
      type: "text",
      message: message,
      instance_id: "68E0E2878A990",
      access_token: "68de6bd371bd8",
    };

    console.log("📤 Sending API Payload:", payload);

    const apiResponse = await axios.post(
      "https://waichat.com/api/send",
      payload
    );

    console.log("✅ WhatsApp API Response:", apiResponse.data);

    await MessageLog.create({
      customerId: customer._id,
      customerName: customer.name,
      phone: phone,
      message,
      status: "Sent",
    });

    res.json({
      success: true,
      message: "Reminder sent successfully",
    });

  } catch (error) {

    console.error("❌ Error sending reminder:", error.response?.data || error);

    await MessageLog.create({
      phone: req.body?.phone,
      message: "Reminder failed",
      status: "Failed",
    });

    res.status(500).json({
      message: "Failed to send reminder",
    });
  }
};