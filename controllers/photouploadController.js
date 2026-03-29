const Customer = require("../models/Customer");

exports.createCustomers = async (req, res) => {
  try {
    const { customers, rawText } = req.body;

    if (!customers || !Array.isArray(customers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customers data"
      });
    }

    // 🔥 Format & Clean Data
    const formattedCustomers = customers.map((c) => {
      const totalCredit = Number(c.totalCredit) || 0;
      const paidAmount = Number(c.paidAmount) || 0;

      const balance =
        c.balance !== undefined
          ? Number(c.balance)
          : totalCredit - paidAmount;

      return {
        name: c.name || "",
        phone: c.phone || "",
        totalCredit,
        paidAmount,
        balance,

        dueDate: c.dueDate ? new Date(c.dueDate) : null,

        status: balance > 0 ? "Pending" : "Paid",

        rawText,
        source: "ocr"
      };
    });

    // 🔥 Insert Many
    const savedCustomers = await Customer.insertMany(formattedCustomers);

    res.status(201).json({
      success: true,
      message: "Customers saved successfully",
      count: savedCustomers.length,
      data: savedCustomers
    });

  } catch (error) {
    console.error("SAVE CUSTOMER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save customers",
      error: error.message
    });
  }
};