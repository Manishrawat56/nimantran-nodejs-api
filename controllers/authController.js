const HttpStatus = require("http-status-codes");
const {
  comparePassword,
  generatePassword,
  generateToken,
  verifyResetToken,
} = require("../utils/encryption");
const User = require("../models/user");
const Role = require("../models/role");
const {
  sendApiResponse,
  validation,
  fileValidation,
  errorCodeCheck,
  unauthorizedError,
  sendNotFoundApiResponse,
  sendOkApiResponse,
  sendBadRequestApiResponse,
} = require("../helper/resHelper");
const { MSG } = require("../constants/app-constants");
const SCHEMA_NAME = require("../models/schema-name");
const { generateOtpCode } = require("../utils/commonUtils");
const OtpModel = require("../models/otp");
const { CONFIG } = require("../config/auth.config");

exports.signup = (req, res, next) => {
  validation(req);
  // fileValidation(req);
 
  const password = req.body.password;
  console.log("password",password)
  generatePassword(password)
    .then(async (hashedPw) => {
      console.log("req.body",req.body)
      const user = new User({
        ...req.body,
      });
      console.log("user",user)
      let role = await Role.findOne({ roleName: "user" });
      if (!role) {
        role = new Role({ roleName: "user", roleDesc: "user" });
        role.save();
      }
      if (req.file) {
        // const imageUrl = req.file.path;
        user.picUrl = req.file.path;
      }
      user.roles.push(role);
      user.password = hashedPw;
      return user.save();
    })
    .then((result) => {
      return sendApiResponse(res, HttpStatus.StatusCodes.CREATED, {
        userId: result._id,
      });
    })
    .catch((err) => {
      errorCodeCheck(err);
      next(err);
    });
};

exports.login = async (req, res, next) => {
  try {
    validation(req);
    const username = req.body.username;
    const password = req.body.password;
    let loadedUser;
    console.log("username", username);
    console.log("password", password);
    const user = await User.findOne({ username: username }).populate(
      "roles",
      "-_id roleName roleDesc"
    )

    if (!user) {
      unauthorizedError(MSG.emailNotFound);
    }
    loadedUser = user;
    const isEqual = await comparePassword(password, user.password);

    console.log("isEqual", isEqual);
    if (!isEqual) {
      unauthorizedError(MSG.wrongPassword);
    }
    const token = await generateToken(
      loadedUser.email,
      loadedUser._id.toString()
    );
    return sendApiResponse(res, HttpStatus.StatusCodes.OK, {
      token: token,
      user: loadedUser.toJSON(),
    });
  } catch (err) {
    errorCodeCheck(err);
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    validation(req);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let date = new Date();
      date.setHours(date.getHours() + CONFIG.otpExpiredTimeInHour);
      // const code = generateOtpCode();

      const token = await generateToken({ expireIn: date, userId: user._id });
      //token send to mail
      return sendOkApiResponse(res, MSG.forgotPasswordSendMsg);
    } else {
      return sendNotFoundApiResponse(res, MSG.usernameDoesNotExist);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.verifyResetPasswordLink = async (req, res, next) => {
  try {
    if (!req.query.resetToken) {
      return sendBadRequestApiResponse(res, MSG.resetTokenRequired);
    }
    let decodedToken;
    try {
      decodedToken = verifyResetToken(req.query.resetToken);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      unauthorizedError(MSG.notAuthenticated);
    }
    const ep = new Date(decodedToken.expireIn).getTime();
    if (ep < new Date().getTime()) {
      return sendBadRequestApiResponse(res, MSG.resetLinkExpired);
    }
    return sendOkApiResponse(res, MSG.verifiedMsg, { verified: true });
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.otpSender = async (req, res, next) => {
  try {
    validation(req);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let date = new Date();
      date.setHours(date.getHours() + CONFIG.otpExpiredTimeInHour);
      const code = generateOtpCode();
      const otp = new OtpModel({
        code: code,
        expireIn: date,
        isUsed: false,
        user: user._id,
      });
      otp.save().then((saveOtpModel) => {
        return sendOkApiResponse(res, MSG.otpSendMsg, {
          verifier: saveOtpModel._id,
        });
      });
    } else {
      return sendNotFoundApiResponse(res, MSG.usernameDoesNotExist);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    validation(req);
    const otpModel = await OtpModel.findOne({ _id: req.body.verifier });
    if (!otpModel) {
      return sendBadRequestApiResponse(res, MSG.notVerified);
    }
    if (otpModel.code != req.body.code) {
      return sendBadRequestApiResponse(res, MSG.invalidOTP);
    }
    if (otpModel.isUsed) {
      return sendBadRequestApiResponse(res, MSG.otpAlreadyUsed);
    }
    const ep = new Date(otpModel.expireIn).getTime();
    if (ep < new Date().getTime()) {
      return sendBadRequestApiResponse(res, MSG.otpExpired);
    }
    otpModel.isUsed = true;
    otpModel.save();
    const user = await User.findOne({ _id: otpModel.user })
      .populate("roles", "-_id roleName roleDesc")
      .select("-password");
    const token = await generateToken(user.email, user._id);
    return sendApiResponse(res, HttpStatus.StatusCodes.OK, {
      token: token,
      user: user.toJSON(),
    });
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};
