exports.generateNumber=(min,max)=>{
   return Math.floor(Math.random() * max) + min;
}

exports.generateOtpCode=()=>{
    return this.generateNumber(100000,999999);
 }