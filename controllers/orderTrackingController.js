const OrderTrackingEntity = require("../models/orderTracking");
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
    const entity = new OrderTrackingEntity({
      ...req.body,
    });
   
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
    const storeBanner=await OrderTrackingEntity.findById(entity.id);
    if(!storeBanner){
      sendNotFoundApiResponse(res,MSG.couldNotFindAnyItems)
    }
    
    const data = await OrderTrackingEntity.findByIdAndUpdate(entity.id, entity);
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
    const data = await OrderTrackingEntity.findById(req.params.orderTrackingId);
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
    const data = await OrderTrackingEntity.findByIdAndRemove(req.params.orderTrackingId);
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

    const data = await OrderTrackingEntity.find();
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
    const data = await OrderTrackingEntity.deleteMany({});
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
