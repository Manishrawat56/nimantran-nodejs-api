const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const schema = new Schema({
  categoryName: { type: String, require: true },
  slug: { type: String, require: false },
  parentId: { type: String, require: false },
  hasChild: { type: Boolean, require: false },
  positionPriority: { type: Number, require: false },
  labels: { type: String, require: false },
  company: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.company, require: false },
  imageUrl: { type: String, require: false },
  createdBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
  updatedBy:{ type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false }
},{ timestamps: true });
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.category, schema);