const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    payId: { type: String, require: true },
    isCompleted: { type: Boolean, require: false },
    errorCode: { type: String, require: false },
    errorDesc: { type: String, require: false },
    signature: { type: String, require: false },
    order: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.order,
      require: false,
    },
  },
  { timestamps: true }
);
schema.method("toJSON", function () {
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.paymentResponse, schema);
