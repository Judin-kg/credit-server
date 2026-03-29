const express = require("express");
const router = express.Router();

const {
  createCustomers
} = require("../controllers/photouploadController");

// 🔥 Save OCR edited data
router.post("/ocr", createCustomers);

module.exports = router;