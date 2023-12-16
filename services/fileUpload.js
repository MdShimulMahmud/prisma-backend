const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Get the file extension
    const customFileName = `image_${uniqueSuffix}.${fileExtension}`;
    cb(null, customFileName);
  },
});

const imageFilter = function (req, file, cb) {
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/heic"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, PNG, and HEIC files are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
