const CartEntity = require("../models/cart");
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
    const entity = new CartEntity({
      ...req.body,
    });
    console.log("userData", entity);
    entity.user=req.userId;
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
    const storeEntity=await CartEntity.findById(entity.id);
    if(!storeEntity){
      sendNotFoundApiResponse(res,MSG.couldNotFindAnyItems)
    }
    
    const data = await CartEntity.findByIdAndUpdate(entity.id, entity);
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
    const data = await CartEntity.findById(req.params.cartId).populate("product","-__v -_id");;
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
    const data = await CartEntity.findByIdAndRemove(req.params.cartId);
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

    const data = await CartEntity.find().populate("product","-__v -_id");;
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
    const data = await CartEntity.deleteMany({});
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


exports.getAllByUser = async function (req, res, next) {
    try {
      const data = await CartEntity.find({ user: req.userId}).populate("product","-__v -_id");
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