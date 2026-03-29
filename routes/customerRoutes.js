const express = require("express");
const router = express.Router();
// const { getCustomers } = require("../controllers/customerController");
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// GET /api/customers
// router.get("/", getCustomers);
// 🔹 Import Customer
router.post("/", createCustomer);

// 🔹 Get all customers
router.get("/", getCustomers);

// 🔹 Get single
router.get("/:id", getCustomerById);

// 🔹 Update
router.put("/:id", updateCustomer);

// 🔹 Delete
router.delete("/:id", deleteCustomer);

module.exports = router;
