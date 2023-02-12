const { comparePassword, generatePassword } = require("../utils/encryption");
const User = require("../models/user");
const {
  validation,
  sendNotFoundApiResponse,
  sendOkApiResponse,
  errorCodeCheck,
  internalServerError,
  sendApiResponse,
  fileValidation,
} = require("../helper/resHelper");
const { MSG } = require("../constants/app-constants");
const { getPagination, condition } = require("../helper/paginationHelper");
const { myCustomLabels } = require("../config/auth.config");

exports.changePassword = async function (req, res) {
  validation(req);
  const user = await User.findById(req.userId);
  if (!user) {
    return sendNotFoundApiResponse(res, MSG.usernameDoesNotExist);
  }
  const isMatch = await comparePassword(req.body.oldPassword, user.password);
  if (isMatch) {
    const newPassword = await generatePassword(req.body.newPassword);
    const data = await User.findByIdAndUpdate(req.userId, {
      password: newPassword,
    });
    if (data) {
      return sendOkApiResponse(res, null, MSG.password_changed_success);
    } else {
      return internalServerError();
    }
  } else {
    return sendNotFoundApiResponse(res, MSG.invalidOldPassword);
  }
};

exports.updateUserData = async function (req, res, next) {
  try {
    const userData = req.body;
    if (userData?.password) {
      delete userData.password;
    }
    if (userData?.username) {
      delete userData.username;
    }

    console.log("req.file", req.file);
    
    if (req.file) {
      console.log("req.path", req.file.path);
      userData.picUrl = req.file.path;
    }
    console.log("userData", userData);
    const data = await User.findByIdAndUpdate(req.userId, userData);
    if (data) {
      return sendOkApiResponse(res, MSG.success, userData);
    } else {
      const error = new Error("error occurred");
      throw error;
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.updateProfilePic = async function (req, res, next) {
  try {
    fileValidation(req);
    const imageUrl = req.file.path;
    await User.findByIdAndUpdate(req.userId, { picUrl: imageUrl });
    return sendOkApiResponse(res, MSG.success, { imageUrl });
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.getByUserId = async function (req, res, next) {
  try {
    const data = await User.findById(req.params.userId);
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      const error = new Error("error occurred");
      throw error;
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.delete = async function (req, res, next) {
  try {
    const data = await User.findByIdAndRemove(req.params.userId);
    if (data) {
      return sendOkApiResponse(res, MSG.success);
    } else {
      const error = new Error("error occurred");
      throw error;
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.getAll = async function (req, res, next) {
  
  try {
    const { page, size, searchValue } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await User.paginate(condition("firstName", searchValue), {
      sort: { date: -1 },
      populate: {
        path: 'roles',
        select: '-_id roleName roleDesc',
      },
      offset,
      limit,
      customLabels:myCustomLabels
    });
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      const error = new Error("error occurred");
      throw error;
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.deleteAll = async function (req, res, next) {
  try {
    const data = await User.deleteMany({});
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      const error = new Error("error occurred");
      throw error;
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};
