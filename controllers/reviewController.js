const ReviewEntity = require("../models/review");
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
const { myCustomLabels } = require("../config/auth.config");
const { getPagination, condition } = require("../helper/paginationHelper");

exports.create = async function (req, res, next) {
  try {
    validation(req);
    // fileValidation(req);
    const entity = new ReviewEntity({
      ...req.body,
    });
    console.log("req.file", req.file);

    if (req.files) {
      console.log("req.path", req.files.path);
      if (req.files) {
        req.files.forEach((element) => {
            entity.imageUrls.push(element.path)
        });
      }
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
    const storeBanner=await ReviewEntity.findById(entity.id);
    if(!storeBanner){
      sendNotFoundApiResponse(res,MSG.couldNotFindAnyItems)
    }
    entity.imageUrls= storeBanner.imageUrls;
    if (req.files) {
        req.files.forEach((element) => {
            entity.imageUrls.push(element.path)
        });
    }
    // if (imageUrl &&(imageUrl !== storeBanner.imageUrl)) {
    //   clearImage(storeBanner.imageUrl);
    // }
    
    const data = await ReviewEntity.findByIdAndUpdate(entity.id, entity);
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
    const data = await ReviewEntity.findById(req.params.reviewId);
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
    const data = await ReviewEntity.findByIdAndRemove(req.params.reviewId);
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
    const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
      const data = await ReviewEntity.paginate({}, {
        sort: { date: -1 },
       
        offset,
        limit,
        customLabels:myCustomLabels
      });
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
    const data = await ReviewEntity.deleteMany({});
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


exports.getAllByProduct = async function (req, res, next) {
    try {
      if (!req.params.productId) {
        badRequestError();
      }
      const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
      const data = await ReviewEntity.paginate({product: req.params.productId}, {
        sort: { date: -1 },
        populate: {
            path: 'user',
            select: '-_id username picUrl firstName lastName',
          },
        offset,
        limit,
        customLabels:myCustomLabels
      });
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

  exports.getAllByUser = async function (req, res, next) {
    try {
      const { page, size} = req.query;
    const { limit, offset } = getPagination(page, size);
      const data = await ReviewEntity.paginate({user: req.userId}, {
        sort: { date: -1 },
        populate: {
            path: 'product',
            select: '-_id productName SKUNumber imageUrls',
          },
        offset,
        limit,
        customLabels:myCustomLabels
      });
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