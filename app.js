const path = require("path");
const mail = require("./lib/ses_sendemail");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
// const multer = require('multer');
const Role = require("./models/role");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const bannerRoutes = require("./routes/bannerRoute");
const companyRoutes = require("./routes/companyRoute");
const categoryRoutes = require("./routes/categoryRoute");
const addressRoutes = require("./routes/addressRoute");
const productRoutes = require("./routes/productRoute");
const reviewRoutes = require("./routes/reviewRoute");
const cartRoutes = require("./routes/cartRoute");
const discountRoutes = require("./routes/discountRoute");
const gatewayRoutes = require("./routes/gatewayRoute");
const orderAdditionalDataRoutes = require("./routes/orderAdditionalDataRoute");
const orderRoutes = require("./routes/orderRoute");
const orderTrackingRoutes = require("./routes/orderTrackingRoute");
const app = express();
app.use(bodyParser.json());
app.use(cors());
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// // app.use(
// //   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// // );
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use('/users', express.static(path.join(__dirname+"/images", 'users')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/banner", bannerRoutes);
app.use("/company", companyRoutes);
app.use("/category", categoryRoutes);
app.use("/address", addressRoutes);
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/discount", discountRoutes);
app.use("/gateway", gatewayRoutes);
app.use("/orderAdditionalData", orderAdditionalDataRoutes);
app.use("/order", orderRoutes);
app.use("/orderTracking", orderTrackingRoutes);
app.use((error, req, res, next) => {
  console.log("errorData", error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.errorData;

  return res.status(status).json({ message: message, error: data });
});

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/nimantran_db"
    // "mongodb+srv://manish:Mrawat123@cluster0.wndm6ab.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connect!!!");
    app.listen(8080);
    // mail.run()
    roleInitial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function roleInitial() {
  Role.estimatedDocumentCount((err, count) => {
    console.log("estimatedDocumentCount " + count, err);
    if (!err && count === 0) {
      new Role({
        roleName: "user",
        roleDesc: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      new Role({
        roleName: "superadmin",
        roleDesc: "superadmin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superadmin' to roles collection");
      });

      new Role({
        roleName: "admin",
        roleDesc: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
      new Role({
        roleName: "moderator",
        roleDesc: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });
    }
  });
}
