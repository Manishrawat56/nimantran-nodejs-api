const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const schema = new Schema({
    nickName: { type: String, require: false },
    companyName: { type: String, require: true },
    industryType: { type: String, require: true },
    businessEmail: { type: String, require: false },
    businessEmailVerified: { type: Boolean, require: false },
    businessNumber: { type: String, require: false },
    businessNumberVerified: { type: Boolean, require: false },
    businessLandlineNumber: { type: String, require: false },
    companyCode: { type: String, require: false },
    logoUrl: { type: String,required: false, },
    catalogUrl: { type: String,required: false, },
    rateListUrl: { type: String,required: false, },
    
    address1: { type: String, require: false },
    address2: { type: String, require: false },
    street: { type: String, require: false },
    city: { type: String, require: false },
    state: { type: String, require: false },
    country: { type: String, require: false },
    pinCode: { type: String, require: false },
    landmark: { type: String, require: false },
    gstNo: { type: String,required: false, },
    disable: { type: Boolean, default: false },
    createdBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
    updatedBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false }
},{ timestamps: true });

schema.method("toJSON", function () {
    const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model(SCHEMA_NAME.company, schema);
