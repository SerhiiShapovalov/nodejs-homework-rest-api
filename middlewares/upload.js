const multer = require("multer");
const path = require("path");

// const tempDir = path.join(__dirname, "../", "temp");
const destination = path.resolve("temp");

const avatarSize = 1024 * 1024 * 5;

const multerConfig = multer.diskStorage({
  // destination: tempDir,
  destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: avatarSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
