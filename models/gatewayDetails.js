const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const schema = new Schema(
  {
    name: { type: String, require: false },
    keyId: { type: String, require: true },
    keySecret: { type: String, require: false },
    keyHeader: { type: String, require: false },
    submitUrl: { type: String, require: false },
    successUrl: { type: String, require: false },
    company: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.company,
      require: false,
    },
    imageUrl: { type: String, require: false },
    currency: { type: String, default:"INR" },
    themeColor: { type: String, require: false },
    desc: { type: String, require: false },
    failureUrl: { type: String, require: false },
    gatewayCharge: { type: Number, require: false },
    gatewayType: { type: String, require: false },
    disable: { type: Boolean, require: false },
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
module.exports = mongoose.model(SCHEMA_NAME.gateway, schema);
