const multer = require("multer");
const fs = require('fs');
const path = require('path');

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

exports.fileStorageForUser = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/user");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });
  exports.fileStorageForProduct = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/product");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });
  exports.fileStorageForCategory = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/category");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });

  exports.fileStorageForBanner = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/banner");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });
  exports.fileStorageForReview = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/review");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  });

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};

exports.upload = multer({ storage: this.fileStorage, fileFilter: this.fileFilter });

exports.userImageUpload = multer({ storage: this.fileStorageForUser, fileFilter: this.fileFilter });
exports.productImageUpload = multer({ storage: this.fileStorageForProduct, fileFilter: this.fileFilter });
exports.categoryImageUpload = multer({ storage: this.fileStorageForCategory, fileFilter: this.fileFilter });
exports.bannerImageUpload = multer({ storage: this.fileStorageForBanner, fileFilter: this.fileFilter });
exports.reviewImageUpload = multer({ storage: this.fileStorageForReview, fileFilter: this.fileFilter });