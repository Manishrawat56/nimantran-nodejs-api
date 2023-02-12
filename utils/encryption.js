const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CONFIG } = require('../config/auth.config');
exports.comparePassword =async function (candidatePassword, hash) {
   return bcrypt.compare(candidatePassword, hash);
  };
  
exports.generatePassword =async function (password) {
    const salt =await bcrypt.genSalt(10);
    return  bcrypt.hash(password, salt);
  };


  exports.generateToken =async function (email,userId) {
    return jwt.sign(
      {
        email: email,
        userId: userId
      },
      CONFIG.secretKey,
      { expiresIn: CONFIG.expiresIn}
    );
  };
  exports.verifyResetToken =async function (resetToken) {
    return jwt.verify(resetToken,CONFIG.secretKey)
  };

