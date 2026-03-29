// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const photoController = require("../controllers/photoController");

// // Import customers from photo
// router.post(
//   "/import-photo",
//   upload.single("image"),
//   photoController.importFromPhoto
// );

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const photoController = require("../controllers/photoController");

// // 🔥 Ensure uploads folder exists
// const fs = require("fs");
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// router.post(
//   "/import-photo",
//   upload.single("image"),
//   photoController.importPhoto
// );

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const photoController = require("../controllers/photoController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/upload-photo", upload.single("image"), photoController.uploadPhoto);

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadPhoto,getAllOcrData} = require("../controllers/photoController");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/upload-photo", upload.single("image"), uploadPhoto);
router.get("/ocr-data", getAllOcrData);
module.exports = router;