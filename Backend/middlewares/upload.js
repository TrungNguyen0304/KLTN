const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "destinations",
    allowed_formats: ["jpg", "png", "jpeg","avif"],
  },
});

const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'groupImages', maxCount: 10 },
]);

module.exports = upload;
