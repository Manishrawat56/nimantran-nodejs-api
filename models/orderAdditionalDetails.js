const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const schema = new Schema({
  bride: { type: String, require: false },
  groom: { type: String, require: false },
  weddingDate: { type: Date, require: false },
  brideMotherName: { type: String, require: false },
  brideFatherName: { type: String, require: false },
  groomMotherName: { type: String, require: false },
  groomFatherName: { type: String, require: false },
  venue: { type: String, require: false },
  sangeetTiming: { type: Date, require: false },
  mehndiTiming: { type: Date, require: false },
  haldiTiming: { type: Date, require: false },
  baratTiming: { type: Date, require: false },
  vidaiTiming: { type: Date, require: false },
  mama: [{ type: String, require: false }],
  dada: [{ type: String, require: false }],
  chacha: [{ type: String, require: false }],
  thau: [{ type: String, require: false }],
  user: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
  order: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.order, require: false },
},{ timestamps: true });
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.orderAdditionalDetails, schema);
