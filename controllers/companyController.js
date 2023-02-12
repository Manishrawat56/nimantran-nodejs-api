const CompanyEntity = require("../models/company");
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
    validation(req);
    // fileValidation(req);
    const entity = new CompanyEntity({
      ...req.body,
    });
    console.log("req.file", req.file);

    if (req.file) {
      console.log("req.path", req.file.path);
      entity.logoUrl = req.file.path;
    }
    console.log("userData", entity);
    const result = await entity.save();
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
    const entity = req.body;
    const storeBanner=await CompanyEntity.findById(entity.id);
    if(!storeBanner){
      sendNotFoundApiResponse(res,MSG.couldNotFindAnyItems)
    }
    let imageUrl = req.body.logoUrl;
    if (req.file) {
      imageUrl= req.file.path;
      entity.logoUrl = imageUrl;
    }
    if (imageUrl &&(imageUrl !== storeBanner.logoUrl)) {
      clearImage(storeBanner.logoUrl);
    }
    
    const data = await CompanyEntity.findByIdAndUpdate(entity.id, entity);
    if (data) {
      return sendOkApiResponse(res, MSG.success, entity);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.getById = async function (req, res, next) {
  try {
    const data = await CompanyEntity.findById(req.params.companyId);
    if (data) {
      return sendOkApiResponse(res, MSG.success, data);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    error.message=MSG.invalidId
    errorCodeCheck(error);
    next(error);
  }
};

exports.delete = async function (req, res, next) {
  try {
    const data = await CompanyEntity.findByIdAndRemove(req.params.companyId);
    if (data) {
      return sendOkApiResponse(res, MSG.success);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    error.message=MSG.invalidId
    errorCodeCheck(error);
    next(error);
  }
};

exports.getAll = async function (req, res, next) {
  try {
    //     const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const data = await CompanyEntity.find();
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
    const data = await CompanyEntity.deleteMany({});
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
