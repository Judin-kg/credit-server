










// const XLSX = require("xlsx");
// const Customer = require("../models/Customer");

// // 📤 Upload & Preview Excel
// exports.uploadExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Read Excel from memory buffer
//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const sheetData = XLSX.utils.sheet_to_json(
//       workbook.Sheets[sheetName]
//     );

//     res.status(200).json({
//       success: true,
//       data: sheetData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Excel parsing failed" });
//   }
// };

// // 💾 Save Confirmed Data
// // exports.saveExcelData = async (req, res) => {
// //   try {

// //     if (!Array.isArray(req.body)) {
// //       return res.status(400).json({ message: "Invalid data format" });
// //     }

// //     await Customer.insertMany(req.body);

// //     res.status(200).json({
// //       success: true,
// //       message: "Data saved successfully",
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Saving failed" });
// //   }
// // };




// exports.saveExcelData = async (req, res) => {
//   try {
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({ message: "Invalid data format" });
//     }

//     const sanitizedData = req.body.map((item) => ({
//       ...item,
//       status:
//         String(item.status || "PENDING").toUpperCase() === "PAID"
//           ? "PAID"
//           : "PENDING",
//     }));

//     await Customer.insertMany(sanitizedData);

//     res.status(200).json({
//       success: true,
//       message: "Data saved successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Saving failed" });
//   }
// };










// const XLSX = require("xlsx");
// const Customer = require("../models/Customer");

// // 📤 Upload & Preview Excel
// exports.uploadExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];

//     const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
//       defval: "", // prevent undefined
//     });

//     // Normalize headers
//     const formatted = rows.map((row) => ({
//       name: row["Name"] || "",
//       phone: String(row["Phone"] || ""),
//       totalCredit: Number(row["Total Credit"] || 0),
//       paidAmount: Number(row["Paid Amount"] || 0),
//       balance: Number(row["Balance"] || 0),
//       dueDate: row["Due Date"]
//         ? new Date(row["Due Date"])
//         : null,
//       status:
//         String(row["Status"] || "PENDING").toUpperCase() === "PAID"
//           ? "PAID"
//           : "PENDING",
//     }));

//     res.status(200).json({
//       success: true,
//       data: formatted,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Excel parsing failed" });
//   }
// };

// // 💾 Save Confirmed Data
// exports.saveExcelData = async (req, res) => {
//   try {
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({ message: "Invalid data format" });
//     }

//     const sanitizedData = req.body.map((item) => ({
//       name: item.name,
//       phone: item.phone,
//       totalCredit: Number(item.totalCredit || 0),
//       paidAmount: Number(item.paidAmount || 0),
//       balance: Number(item.balance || 0),
//       dueDate: item.dueDate ? new Date(item.dueDate) : null,
//       status:
//         String(item.status || "PENDING").toUpperCase() === "PAID"
//           ? "PAID"
//           : "PENDING",
//     }));

//     await Customer.insertMany(sanitizedData);

//     res.status(200).json({
//       success: true,
//       message: "Data saved successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Saving failed" });
//   }
// };







// const XLSX = require("xlsx");
// const Customer = require("../models/Customer");

// // 📤 Upload & Preview Excel
// exports.uploadExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     console.log("📂 Uploaded File:", req.file.originalname);

//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];

//     console.log("📑 Sheet Name:", sheetName);

//     const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
//       defval: "",
//     });

//     // 🟢 Raw Excel rows

//     console.log("📊 Raw Excel Data:");
//     console.log(rows,"rowwwwwwwwwwwwwwwwwwwwwwwwwws");
//     console.table(rows);

//     // Normalize headers
//     const formatted = rows.map((row, index) => {
//       const data = {
//         name: row["Name"] || "",
//         phone: String(row["Phone"] || ""),
//         totalCredit: Number(row["Total Credit"] || 0),
//         paidAmount: Number(row["Paid"] || 0),
//         balance: Number(row["Balance"] || 0),
//         dueDate: row["Due Date"] ? new Date(row["Due Date"]) : null,
//         status:
//           String(row["Status"] || "PENDING").toUpperCase() === "PAID"
//             ? "PAID"
//             : "PENDING",
//       };

//       console.log(`📌 Row ${index + 1}:`, data);

//       return data;
//     });

//     // 🟢 Formatted output
//     console.log("✅ Formatted Excel Data:");
//     console.table(formatted);

//     res.status(200).json({
//       success: true,
//       data: formatted,
//     });
//   } catch (error) {
//     console.error("❌ Excel parsing error:", error);
//     res.status(500).json({ message: "Excel parsing failed" });
//   }
// };

// // 💾 Save Confirmed Data
// exports.saveExcelData = async (req, res) => {
//   try {
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({ message: "Invalid data format" });
//     }

//     console.log("📥 Data received for saving:");
//     console.table(req.body);

//     const sanitizedData = req.body.map((item, index) => {
//       const data = {
//         name: item.name,
//         phone: item.phone,
//         totalCredit: Number(item.totalCredit || 0),
//         paid: Number(item.paidAmount || 0),
//         balance: Number(item.balance || 0),
//         dueDate: item.dueDate ? new Date(item.dueDate) : null,
//         status:
//           String(item.status || "PENDING").toUpperCase() === "PAID"
//             ? "PAID"
//             : "PENDING",
//       };

//       console.log(`💾 Saving Row ${index + 1}:`, data);

//       return data;
//     });

//     console.log("🚀 Final Data Going to MongoDB:");
//     console.table(sanitizedData);

//     await Customer.insertMany(sanitizedData);

//     console.log("✅ Data inserted successfully");

//     res.status(200).json({
//       success: true,
//       message: "Data saved successfully",
//     });
//   } catch (error) {
//     console.error("❌ Saving failed:", error);
//     res.status(500).json({ message: "Saving failed" });
//   }
// };


const XLSX = require("xlsx");
const Customer = require("../models/Customer");

// Convert Excel Date → JS Date
const parseExcelDate = (value) => {
  if (!value) return null;

  // If Excel serial number
  if (typeof value === "number") {
    return new Date(Math.round((value - 25569) * 86400 * 1000));
  }

  // If string date
  const date = new Date(value);
  return isNaN(date) ? null : date;
};

// Normalize header keys
const normalizeKeys = (row) => {
  const normalized = {};
  Object.keys(row).forEach((key) => {
    const newKey = key.toLowerCase().trim();
    normalized[newKey] = row[key];
  });
  return normalized;
};

// 📤 Upload & Preview Excel
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📂 Uploaded File:", req.file.originalname);

    const workbook = XLSX.read(req.file.buffer, {
      type: "buffer",
      cellDates: true,
    });

    const sheetName = workbook.SheetNames[0];
    console.log("📑 Sheet:", sheetName);

    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
      raw: false,
    });

    console.log("📊 Raw Excel Data");
    console.table(rows);
    console.log(rows,"rowssss");
    

    const formatted = rows.map((row, index) => {
      const r = normalizeKeys(row);

      
      

      const data = {
        name: String(r["name"] || "").trim(),
        phone: String(r["phone"] || "").trim(),
        totalCredit: Number(r["total credit"] || r["credit"] || 0),
        paidAmount: Number(r["paid"] || r["paid amount"] || 0),
        balance: Number(r["balance"] || 0),
        dueDate: parseExcelDate(r["due date"]),
        status:
          String(r["status"]||"").toUpperCase(),
      };

      console.log(`📌 Row ${index + 1}`, data);

      return data;
    });

    console.log("✅ Cleaned Excel Data");
    console.table(formatted);

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Excel parsing error:", error);
    res.status(500).json({ message: "Excel parsing failed" });
  }
};




// 💾 Save Confirmed Data
exports.saveExcelData = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    console.log("📥 Data received");
    console.table(req.body);

    const sanitizedData = req.body.map((item, index) => {
      const data = {
        name: String(item.name || "").trim(),
        phone: String(item.phone || "").trim(),
        totalCredit: Number(item.totalCredit || 0),
        paidAmount: Number(item.paidAmount || 0),
        balance: Number(item.balance || 0),
        dueDate: item.dueDate ? new Date(item.dueDate) : null,
        status:
          String(item.status || "").toUpperCase() ,
      };

      console.log(`💾 Saving Row ${index + 1}`, data);

      return data;
    });

    console.log("🚀 Final Data");
    console.table(sanitizedData);

    await Customer.insertMany(sanitizedData);

    console.log("✅ Insert Success");

    res.status(200).json({
      success: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    console.error("❌ Saving failed:", error);
    res.status(500).json({ message: "Saving failed" });
  }
};

