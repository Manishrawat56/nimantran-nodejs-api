const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema({
    code: { type: String, require: true },
    expireIn: { type:Date, require: true },
    isUsed: { type: Boolean, require: false,default:false },
    usePlace: { type: String, require: false },
    user: { type: Schema.Types.ObjectId, require: true },
},{ timestamps: true });
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model(SCHEMA_NAME.otp, schema);