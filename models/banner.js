const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    imageUrl: { type: String, require: true },
    positionPriority: { type: Number,default:5, require: false },
    linkUrl: { type: String, require: false },
    inAppRoute:{ type: Boolean, require: true,default:false },
    appRoute: { type: String, require: false },
    disable: { type: Boolean, default: false },
    company: { 
      type: Schema.Types.ObjectId,
    ref:SCHEMA_NAME.company,require: false},
    createdBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
    updatedBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false }
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.banner, schema);