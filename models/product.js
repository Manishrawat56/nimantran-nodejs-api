const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const mongoosePaginate = require("mongoose-paginate-v2");
// const schemaImages = new Schema({
//   imageUrl: { type: String, require: true },
//   sequenceNo: { type: Number, require: true },
// });
const schema = new Schema(
  {
    productName: { type: String, require: true },
    SKUNumber: { type: String, require: true },
    shortDesc: { type: String, require: false },
    productDesc: { type: String, require: false },
    positionPriority: { type: Number, require: false, default: 5 },
    mrp: { type: Number, require: true },
    sellPrice: { type: Number, require: true },
    taxPercentage: { type: Number, default: 18 },
    isTaxIncluded: { type: Boolean, require: false },
    isGatewayChargeIncluded: { type: Boolean, require: false },
    labels: { type: String, require: false },
    exclusiveCategory: { type: String, require: false },
    color: { type: String, require: false },
    size: { type: String, require: false },
    weight: { type: Number, require: false },
    videoUrl: { type: String, require: false },
    categories: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.category,
      require: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.company,
      require: false,
    },
    imageUrls: [
      {
        url: { type: String, require: true },
        sequenceNo: { type: Number, require: true },
      },
    ],
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
schema.plugin(mongoosePaginate);
module.exports = mongoose.model(SCHEMA_NAME.product, schema);
