const ProductEntity = require("../models/product");
const {
  validation,
  sendNotFoundApiResponse,
  sendOkApiResponse,
  errorCodeCheck,
  internalServerError,
  badRequestError,
  filesValidation,
} = require("../helper/resHelper");
const { MSG } = require("../constants/app-constants");
const { clearImage } = require("../utils/fileUtils");
const { getPagination, condition } = require("../helper/paginationHelper");
const { myCustomLabels } = require("../config/auth.config");

exports.create = async function (req, res, next) {
  try {
    filesValidation(req);
    const product = new ProductEntity({
      ...req.body,
    });
    if (req.files) {
      req.files.forEach((element, index) => {
        product.imageUrls.push({ url: element.path, sequenceNo: index });
      });
    }
    console.log("req.body", req.body);
    const result = await product.save();
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
    const product = req.body;
    const storeBanner = await ProductEntity.findById(product.id);
    if (!storeBanner) {
      sendNotFoundApiResponse(res, MSG.couldNotFindAnyItems);
    }
    if (req.files) {
      req.files.forEach((element, index) => {
        product.imageUrls.push({
          url: element.path,
          sequenceNo: storeBanner.imageUrls.length + index,
        });
      });
      // product.imageUrls = imageUrl;
    }
    // if (imageUrls &&(imageUrls !== storeBanner.imageUrls)) {
    //   clearImage(storeBanner.imageUrl);
    // }
    console.log("update product", product);
    const data = await ProductEntity.findByIdAndUpdate(product.id, product);
    console.log("update data", data);
    if (data) {
      return sendOkApiResponse(res, MSG.success, product);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.updateImage = async function (req, res, next) {
  let storeBanner;
  try {
    storeBanner = await ProductEntity.findById(req.params.productId);
    if (!storeBanner) {
      sendNotFoundApiResponse(res, MSG.couldNotFindAnyItems);
    }
  } catch (error) {
    error.message = MSG.invalidId;
    errorCodeCheck(error);
    next(error);
  }

  try {
    if (req.files) {
      req.files.forEach((element, index) => {
        storeBanner.imageUrls.push({ url: element.path, sequenceNo: index });
      });
    }

    const data = await ProductEntity.findByIdAndUpdate(
      req.params.productId,
      storeBanner
    );
    if (data) {
      return sendOkApiResponse(res, MSG.success, product.imageUrls);
    } else {
      internalServerError(MSG.somethingWentWrong);
    }
  } catch (error) {
    errorCodeCheck(error);
    next(error);
  }
};

exports.removeImage = async function (req, res, next) {
  let storeBanner;
  try {
    const { imageId } = req.body;
    storeBanner = await ProductEntity.findById(req.params.productId);
    if (!storeBanner) {
      sendNotFoundApiResponse(res, MSG.couldNotFindAnyItems);
    }
  } catch (error) {
    error.message = MSG.invalidId;
    errorCodeCheck(error);
    next(error);
  }

  try {
    const list = [];
    storeBanner.imageUrls.forEach((element) => {
      if (element._id == imageId) {
        clearImage(element.url);
      } else {
        list.push(element);
      }
    });
    storeBanner.imageUrls = list;
    const data = await ProductEntity.findByIdAndUpdate(
      req.params.productId,
      storeBanner
    );
    if (data) {
      return sendOkApiResponse(res, MSG.success, storeBanner.imageUrls);
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
    const data = await ProductEntity.findById(req.params.productId);
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
    const data = await ProductEntity.findByIdAndRemove(req.params.productId);
    if (data) {
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
    const {
      page,
      size,
      searchValue,
      exclusiveCategory,
      color,
      labels,
      weight,
    } = req.query;
    const { limit, offset } = getPagination(page, size);
    const filterCondition = condition("productName", searchValue);
    if (exclusiveCategory) {
      filterCondition.exclusiveCategory = exclusiveCategory;
    }
    if (color) {
      filterCondition.color = color;
    }
    if (labels) {
      filterCondition.labels = labels;
    }
    if (weight) {
      filterCondition.weight = weight;
    }
    const data = await ProductEntity.paginate(filterCondition, {
      sort: { date: -1 },

      offset,
      limit,
      customLabels: myCustomLabels,
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
exports.getAllByCompany = async function (req, res, next) {
  try {
    if (!req.params.companyId) {
      badRequestError();
    }
    const {
      page,
      size,
      searchValue,
      exclusiveCategory,
      color,
      labels,
      weight,
    } = req.query;
    const { limit, offset } = getPagination(page, size);
    const filterCondition = condition("productName", searchValue);
    if (exclusiveCategory) {
      filterCondition.exclusiveCategory = exclusiveCategory;
    }
    if (color) {
      filterCondition.color = color;
    }
    if (labels) {
      filterCondition.labels = labels;
    }
    if (weight) {
      filterCondition.weight = weight;
    }
    filterCondition.company = req.params.companyId;
    const data = await ProductEntity.paginate(filterCondition, {
      sort: { date: -1 },

      offset,
      limit,
      customLabels: myCustomLabels,
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
exports.getAllByCategoryAndCompany = async function (req, res, next) {
  try {
    if (!req.params.categoryId) {
      badRequestError();
    }
    const {
      page,
      size,
      searchValue,
      exclusiveCategory,
      color,
      labels,
      weight,
    } = req.query;
    const { limit, offset } = getPagination(page, size);
    const filterCondition = condition("productName", searchValue);
    if (exclusiveCategory) {
      filterCondition.exclusiveCategory = exclusiveCategory;
    }
    if (color) {
      filterCondition.color = color;
    }
    if (labels) {
      filterCondition.labels = labels;
    }
    if (weight) {
      filterCondition.weight = weight;
    }
    filterCondition.categories = req.params.categoryId;
    filterCondition.company = req.params.companyId;
    const data = await ProductEntity.paginate(filterCondition, {
      sort: { date: -1 },

      offset,
      limit,
      customLabels: myCustomLabels,
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
    const data = await ProductEntity.deleteMany({});
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
