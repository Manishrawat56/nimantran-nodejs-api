const jwt = require('jsonwebtoken');
const { CONFIG } = require('../config/auth.config');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  console.log("token",token)
  let decodedToken;
  try {
    decodedToken = jwt.verify(token,CONFIG.secretKey);
  } catch (err) {
    err.statusCode = 500;
    if(err.message=='jwt expired'){
      err.message='token expired'
    }
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
