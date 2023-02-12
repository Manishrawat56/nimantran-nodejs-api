const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    discountCode: { type: String, require: true },
    discountType: { type: String, default: "coupon" },
    minQuantity: { type: Number, require: false },
    maxQuantity: { type: Number, require: false },
    type: { type: String, default: "F" },
    usability: { type: Number, require: false },
    company: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.company,
      require: false,
    },
    useBy: [
      { type: Schema.Types.ObjectId, ref: SCHEMA_NAME.user, require: false },
    ],
    useCount: { type: Number, require: false },
    expiredAt: { type: Date, require: false },
    minAmount: { type: Number, default: 0 },
    validityType: { type: String, require: false, default: "L" },
    value: { type: Number, require: true },
    disable: { type: Boolean, require: false },
    useCount: { type: Number, require: false, default: 0 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.user,
      require: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.user,
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
module.exports = mongoose.model(SCHEMA_NAME.discount, schema);
