// import express from "express";
// import multer from "multer";
// import {
//   uploadExcel,
//   saveExcelData,
// } from "../controllers/excelController";

// const router = express.Router();

// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("file"), uploadExcel);
// router.post("/save", saveExcelData);

// export default router;




// const express = require("express");
// const multer = require("multer");
// const {
//   uploadExcel,
//   saveExcelData,
// } = require("../controllers/excelController");

// const router = express.Router();

// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("file"), uploadExcel);
// router.post("/save", saveExcelData);

// module.exports = router;





const express = require("express");
const multer = require("multer");
const {
  uploadExcel,
  saveExcelData,
} = require("../controllers/excelController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Preview Excel
router.post("/upload", upload.single("file"), uploadExcel);

// Save Confirmed Data
router.post("/save", saveExcelData);

module.exports = router;
