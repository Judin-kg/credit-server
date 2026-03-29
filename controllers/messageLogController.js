const MessageLog = require("../models/MessageLog");

// 📤 Create message log (after WhatsApp send)
exports.createMessageLog = async (req, res) => {
  try {
    const log = await MessageLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message log saved",
      data: log,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save message log" });
  }
};

// 📥 Get all message logs
exports.getMessageLogs = async (req, res) => {
  try {
    const logs = await MessageLog.find()
      .sort({ sentAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch message logs" });
  }
};

// 📥 Get logs by customer
exports.getCustomerLogs = async (req, res) => {
  try {
    const logs = await MessageLog.find({
      customerId: req.params.customerId,
    }).sort({ sentAt: -1 });

    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customer logs" });
  }
};
