




// const Tesseract = require("tesseract.js");
// const fs = require("fs");
// const Customer = require("../models/Customer");

// // 🔥 Safe Date Parser
// const parseDate = (dateString) => {
//   if (!dateString) return null;

//   // Handle dd/mm/yyyy
//   if (dateString.includes("/")) {
//     const parts = dateString.split("/");
//     if (parts.length === 3) {
//       const [day, month, year] = parts;
//       const formatted = `${year}-${month}-${day}`;
//       const date = new Date(formatted);
//       return isNaN(date.getTime()) ? null : date;
//     }
//   }

//   // Handle yyyy-mm-dd or other formats
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// exports.importPhoto = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const imagePath = req.file.path;

//     console.log(imagePath,"imaaaaaagepaaath");
    

//     // 🧠 OCR
//     const {
//       data: { text },
//     } = await Tesseract.recognize(imagePath, "eng");

//     console.log("Extracted Text:\n", text);

//     const lines = text
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line !== "");

//       console.log(lines,"linesssssssssss");
      

//     const customers = [];

//     for (let line of lines) {
//       const columns = line.split(/\s+/);

//       // Expected format:
//       // Name Phone TotalCredit Paid DueDate
//       if (columns.length >= 5) {
//         const name = columns[0];
//         const phone = columns[1];

//         const totalCredit = Number(columns[2].replace(/,/g, "")) || 0;


//         console.log(totalCredit,"toootalcredit");
        
//         const paid = Number(columns[3].replace(/,/g, "")) || 0;

//         const dueDate = parseDate(columns[4]);

//         console.log(dueDate,"duedaaaaaaaate");
        

//         if (!dueDate) {
//           console.log("❌ Skipping invalid date row:", line);
//           continue;
//         }

//         const balance = totalCredit - paid;

//         console.log(balance,"balanceeeeeeeeeeeeeee");
        

//         let status = "Pending";
//         const today = new Date();

//         if (balance <= 0) {
//           status = "Paid";
//         } else if (dueDate < today) {
//           status = "Overdue";
//         }

//         customers.push({
//           name,
//           phone,
//           totalCredit,
//           paid,
//           balance,
//           dueDate,
//           status,
//           action: "Imported",
//         });
//       }
//     }


//     console.log(customers,"customerssssssss");

    

//     if (customers.length === 0) {
//       return res.status(400).json({
//         message: "No valid customer data found",
//       });
//     }

//     // 💾 Save to DB
//     await Customer.insertMany(customers);

//     // 🗑 Safe delete image
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//     }

//     res.json({
//       message: "Import successful",
//       customers,
//     });
//   } catch (error) {
//     console.error("OCR ERROR:", error);
//     res.status(500).json({
//       message: "OCR failed",
//       error: error.message,
//     });
//   }
// };








exports.getAllOcrData = async (req, res) => {
  try {

    const records = await OcrData.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: records.length,
      data: records
    });

  } catch (error) {

    console.error("FETCH OCR ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch OCR data"
    });

  }
};













// const visionClient = require("../config/vision");
// const OcrData = require("../models/OcrData");
// const sharp = require("sharp");

// exports.uploadPhoto = async (req, res) => {
//   try {

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded"
//       });
//     }

//     // 🔹 Advanced preprocessing
//     const processedImage = await sharp(req.file.buffer)
//       .rotate()
//       .trim()
//       .resize({ width: 2200 })
//       .grayscale()
//       .normalize()
//       .median(1)
//       .blur(0.3)
//       .sharpen({ sigma: 1.8 })
//       .toBuffer();

//     // 🔹 OCR detection
//     const [result] = await visionClient.documentTextDetection({
//       image: { content: processedImage }
//     });

//     if (!result.fullTextAnnotation) {
//       return res.status(400).json({
//         success: false,
//         message: "No text detected"
//       });
//     }

//     const extractedText = result.fullTextAnnotation.text;

//     console.log("OCR TEXT:\n", extractedText);

//     // 🔹 Extract words with coordinates
//     const words = [];

//     result.fullTextAnnotation.pages.forEach(page => {
//       page.blocks.forEach(block => {
//         block.paragraphs.forEach(paragraph => {
//           paragraph.words.forEach(word => {

//             const text = word.symbols.map(s => s.text).join("");

//             const x = word.boundingBox.vertices[0].x || 0;
//             const y = word.boundingBox.vertices[0].y || 0;

//             words.push({ text, x, y });

//           });
//         });
//       });
//     });

//     // 🔹 Helper function to find nearest value
//     const findRightValue = (keyword) => {

//       const fieldWord = words.find(w =>
//         w.text.toLowerCase().includes(keyword)
//       );

//       if (!fieldWord) return null;

//       const sameLineWords = words.filter(w =>
//         Math.abs(w.y - fieldWord.y) < 30 && w.x > fieldWord.x
//       );

//       sameLineWords.sort((a, b) => a.x - b.x);

//       return sameLineWords.length ? sameLineWords[0].text : null;
//     };

//     // 🔹 Extract fields dynamically
//     const nameValue = findRightValue("name");
//     const balanceValue = findRightValue("balance");
//     const creditValue = findRightValue("credit");
//     const dateValue = findRightValue("date");

//     let dueDate = null;

//     if (dateValue && dateValue.includes("/")) {
//       const parts = dateValue.split("/");
//       if (parts.length === 3) {
//         const [d, m, y] = parts;
//         dueDate = new Date(`${y}-${m}-${d}`);
//       }
//     }

//     const customer = {
//       name: nameValue || "",
//       balance: balanceValue ? Number(balanceValue.replace(/\D/g, "")) : 0,
//       totalCredit: creditValue ? Number(creditValue.replace(/\D/g, "")) : 0,
//       dueDate
//     };

//     console.log("PARSED CUSTOMER:", customer);

//     // 🔹 Save
//     const savedData = await OcrData.create({
//       rawText: extractedText,
//       customers: [customer],
//       source: "photo"
//     });

//     res.json({
//       success: true,
//       data: savedData
//     });

//   } catch (error) {

//     console.error("OCR ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "OCR Processing Failed",
//       error: error.message
//     });

//   }
// };


//importenttttttttttttttttttttttttttttttttttttt

const visionClient = require("../config/vision");
const OcrData = require("../models/OcrData");
const sharp = require("sharp");

exports.uploadPhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    // 🔹 Improve OCR accuracy
    const processedImage = await sharp(req.file.buffer)
      .rotate()
      .trim()
      .resize({ width: 2500 })
      .grayscale()
      .normalize()
      .modulate({ brightness: 1.2, contrast: 1.3 })
      .median(1)
      .blur(0.3)
      .sharpen({ sigma: 1.8 })
      .toBuffer();

    // 🔹 OCR detection with bounding boxes
    const [result] = await visionClient.documentTextDetection({
      image: { content: processedImage }
    });

 console.log(result,"resulttttttttttttttt");
 
 

    if (!result.fullTextAnnotation) {
      return res.status(400).json({
        success: false,
        message: "No text detected"
      });
    }

    const extractedText = result.fullTextAnnotation.text;

    console.log("OCR TEXT:\n", extractedText);

    // 🔹 Collect words with coordinates
    const words = [];

    result.fullTextAnnotation.pages.forEach(page => {
      page.blocks.forEach(block => {
        block.paragraphs.forEach(paragraph => {
          paragraph.words.forEach(word => {

            const text = word.symbols.map(s => s.text).join("");

            const x = word.boundingBox.vertices[0].x || 0;
            const y = word.boundingBox.vertices[0].y || 0;

            words.push({ text, x, y });

          });
        });
      });
    });

    // 🔹 Find value to the right of a field
    const findRightValue = (keyword) => {

      const fieldWord = words.find(w =>
        w.text.toLowerCase().includes(keyword)
      );

      if (!fieldWord) return null;

      const sameRow = words.filter(w =>
        Math.abs(w.y - fieldWord.y) < 30 && w.x > fieldWord.x
      );

      if (!sameRow.length) return null;

      sameRow.sort((a, b) => a.x - b.x);

      return sameRow.map(w => w.text).join(" ");
    };

    // 🔹 Extract values dynamically
    const nameValue = findRightValue("name");
    const balanceValue = findRightValue("balance");
    const creditValue = findRightValue("credit");
    const dateValue = findRightValue("date");

    // 🔹 Date parsing
    let dueDate = null;

    if (dateValue) {
      const dateMatch = dateValue.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/);

      if (dateMatch) {
        const [d, m, y] = dateMatch[0].split("/");
        dueDate = new Date(`${y}-${m}-${d}`);
      }
    }

    // 🔹 Final parsed object
    const customer = {
      name: nameValue || "",
      balance: balanceValue ? Number(balanceValue.replace(/\D/g, "")) : 0,
      totalCredit: creditValue ? Number(creditValue.replace(/\D/g, "")) : 0,
      dueDate
    };

    console.log("PARSED CUSTOMER:", customer);

    // 🔹 Save to MongoDB
    const savedData = await OcrData.create({
      rawText: extractedText,
      customers: [customer],
      source: "photo"
    });

    res.json({
      success: true,
      data: savedData
    });

  } catch (error) {

    console.error("OCR ERROR:", error);

    res.status(500).json({
      success: false,
      message: "OCR Processing Failed",
      error: error.message
    });

  }
};




