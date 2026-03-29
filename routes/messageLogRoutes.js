const express = require("express");
const router = express.Router();
const {
  createMessageLog,
  getMessageLogs,
  getCustomerLogs,
} = require("../controllers/messageLogController");

// Create log
router.post("/", createMessageLog);

// Get all logs
router.get("/", getMessageLogs);

// Get logs by customer
router.get("/customer/:customerId", getCustomerLogs);

module.exports = router;
