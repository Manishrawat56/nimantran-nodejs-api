const BannerEntity = require("../models/banner");
const {
  validation,
  sendNotFoundApiResponse,
  sendOkApiResponse,
  errorCodeCheck,
  internalServerError,
  sendApiResponse,
  fileValidation,
  badRequestError,
} = require("../helper/resHelper");
const { MSG } = require("../constants/app-constants");
const { clearImage } = require("../utils/fileUtils");

exports.create = async function (req, res, next) {
  try {
    fileValidation(req);
    const banner = new BannerEntity({
      ...req.body,
    });
    console.log("req.file", req.file);

    if (req.file) {
      console.log("req.path", req.file.path);
      banner.imageUrl = req.file.path;
    }
    console.log("userData", banner);
    const result = await banner.save();
    if (result) {
      return sendOkApiResponse(res, MSG.success, result);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.update = async function (req, res, next) {
  try {
    validation(req);
    const banner = req.body;
    const storeBanner = await BannerEntity.findById(banner.id);
    if (!storeBanner) {
      sendNotFoundApiResponse(res, MSG.couldNotFindAnyItems);
    }
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
      banner.imageUrl = imageUrl;
    }
    if (imageUrl && imageUrl !== storeBanner.imageUrl) {
      clearImage(storeBanner.imageUrl);
    }

    const data = await BannerEntity.findByIdAndUpdate(banner.id, banner);
    if (data) {
      return sendOkApiResponse(res, MSG.success, banner);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.getByBannerId = async function (req, res, next) {
  try {
    const data = await BannerEntity.findById(req.params.bannerId);
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    error.message = MSG.invalidId;
    errorCodeCheck(error);
    next(error);
  }
};

exports.delete = async function (req, res, next) {
  try {
    const storeBanner = await BannerEntity.findById(req.params.bannerId);
    if (!storeBanner) {
      sendNotFoundApiResponse(res, MSG.couldNotFindAnyItems);
    }

    const data = await BannerEntity.findByIdAndRemove(req.params.bannerId);
    console.log("findByIdAndRemove data", data);
    if (data) {
      clearImage(storeBanner.imageUrl);
      return sendOkApiResponse(res, MSG.success);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    error.message = MSG.invalidId;
    errorCodeCheck(error);
    next(error);
  }
};

exports.getAll = async function (req, res, next) {
  try {
    //     const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const data = await BannerEntity.find().sort("positionPriority");
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.getAllByCompany = async function (req, res, next) {
  try {
    if (!req.params.companyId) {
      badRequestError();
    }
    const data = await BannerEntity.find({
      company: req.params.companyId,
    }).sort("positionPriority");
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.deleteAll = async function (req, res, next) {
  try {
    const data = await BannerEntity.deleteMany({});
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
