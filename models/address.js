const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    address1: { type: String, require: true },
    address2: { type: String, require: false },
    street: { type: String, require: false },
    city: { type: String, require: false },
    state: { type: String, require: false },
    country: { type: String, require: false },
    pinCode: { type: String, require: false },
    landmark: { type: String, require: false },
    type: { type: String, require: false },
    user: { type: Schema.Types.ObjectId, require: true },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.address, schema);
