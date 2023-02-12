const express = require("express");

const { ROUTE_NAME } = require("./routeEnum");

const authController = require("../controllers/authController");
const {
  signUpValidation,
  loginValidation,
  optSendValidation,
  optVerifyValidation,
} = require("../utils/validationUtils");
const { userImageUpload } = require("../utils/fileUtils");
const router = express.Router();




router.post(ROUTE_NAME.signUp, userImageUpload.single("image"), signUpValidation, authController.signup);
router.post(ROUTE_NAME.login, loginValidation, authController.login);

router.post(ROUTE_NAME.sendOtp,optSendValidation, authController.otpSender);
router.post(ROUTE_NAME.verifyOtp, optVerifyValidation,authController.verifyOTP);

router.post(ROUTE_NAME.forgotPassword,optSendValidation, authController.forgotPassword);
router.post(ROUTE_NAME.verifyResetToken, authController.verifyResetPasswordLink);
module.exports = router;
