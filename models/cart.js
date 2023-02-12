const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    quantity: { type: Number, require: true,default:1 },
    color: { type: String, require: false },
    size: { type: String, require: false },
    weight: { type: Number, require: false },
    disable: { type: Boolean, default: false },
    product: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.product, require: true },
    user: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: true },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.cart, schema);
