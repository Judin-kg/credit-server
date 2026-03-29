const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/stats", async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();

    const totalCreditAgg = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: "$totalCredit" } } },
    ]);

    const overdueAccounts = await Customer.countDocuments({
      status: "PENDING",
    });

    const today = new Date().toISOString().split("T")[0];

    const dueToday = await Customer.countDocuments({
      dueDate: today,
    });

    res.json({
      totalCustomers,
      totalCredit: totalCreditAgg[0]?.total || 0,
      overdueAccounts,
      dueToday,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});

module.exports = router;
