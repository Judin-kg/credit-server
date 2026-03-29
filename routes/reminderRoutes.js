const express = require("express");
const router = express.Router();
const {
  sendManualReminder,
} = require("../controllers/reminderController");

router.post("/send/:customerId", sendManualReminder);

module.exports = router;
