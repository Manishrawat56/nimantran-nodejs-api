const { body } = require("express-validator");
const User = require("../models/user");
const sanitizeHtml = require('sanitize-html');
function email(){
    return body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      });
    })
    .normalizeEmail()
}
function password (){
    return body("password").trim().isLength({ min: 5 })
}
function firstName (){
    return body("firstName").trim().not().isEmpty()
}
function username (){
    return body("username").trim().isLength({ min: 4 })
}
function minLength(field,minLength){
    return body(field).trim().isLength({ min: minLength })
}

exports.signUpValidation =[ email(),
  password(),
  firstName(),
  username(),
]

exports.loginValidation =[
  minLength('username',4),
  minLength('password',5)
]
exports.optSendValidation =[
  email()
]
exports.optVerifyValidation =[
  body("code").trim().not().isEmpty().withMessage('OTP code is required'),
  body("verifier").trim().not().isEmpty().withMessage('verifier is required')
]

exports.companyValidation =[
  body("companyName").trim().not().isEmpty().withMessage('Company Name is required'),
  body("industryType").trim().not().isEmpty().withMessage('Industry Type is required'),
]
exports.categoryValidation =[
  body("categoryName").trim().not().isEmpty().withMessage('Category Name is required'),
]

exports.addressValidation =[
  body("address1").trim().not().isEmpty().withMessage('Address1 is required'),
]

exports.updateByIdValidation =[
  body("id").trim().not().isEmpty().withMessage('Id is required'),
]
exports.userIdValidation =[
  body("userId").trim().not().isEmpty().withMessage('user id is required'),
]
exports.productValidation =[
  body('productDesc').not().isEmpty().trim().isLength({ min: 0 }).customSanitizer(value => {
    return sanitizeHtml(value, {
        exclusiveFilter: (frame) => {
            return frame.tag === 'script';
        },
        textFilter: (value) => {
            return value.replace(/\\n|\s\s/g, "").trim()
        }
    })
  })
]


