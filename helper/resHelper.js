const { validationResult } = require('express-validator');
const HttpStatus = require("http-status-codes");
exports.sendApiResponse =(res,status,result,message)=>{
    return res.status(status).json({ message,result});
}
exports.sendOkApiResponse =(res, message="successful",result)=>{
  return res.status(HttpStatus.StatusCodes.OK).json({ message,result});
}
exports.sendNotFoundApiResponse =(res,message)=>{
  return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message});
}
exports.sendBadRequestApiResponse =(res,message)=>{
  return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message});
}


exports.validation=(req)=>{
    const errors = validationResult(req);
    console.log("error validation",errors)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY;
    error.errorData = errors.array();
    console.log("error",error)
    throw error;
  }
}
exports.fileValidation=(req)=>{
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY;
        throw error;
      }
}

exports.filesValidation=(req)=>{
  if (!req.files) {
      const error = new Error('No image provided.');
      error.statusCode = HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY;
      throw error;
    }
}

exports.errorCodeCheck=(err)=>{
    if (!err.statusCode) {
        err.statusCode = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
      }
}

exports.internalServerError=(message="There are some internal server error")=>{
  const error = new Error(message);
  error.statusCode = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
throw error;
}

exports.badRequestError=(message="There are some internal server error")=>{
  const error = new Error(message);
  error.statusCode = HttpStatus.StatusCodes.BAD_REQUEST;
throw error;
}

exports.unauthorizedError=(message)=>{
const error = new Error(message);
error.statusCode = HttpStatus.StatusCodes.UNAUTHORIZED;
throw error;
}


