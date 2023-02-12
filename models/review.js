const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");
const mongoosePaginate = require("mongoose-paginate-v2");
const schema = new Schema(
  {
    star: { type: String, require: false },
    reviewMsg: { type: String, require: true },
    disable: { type: String, default: false },
    imageUrls: [{ type: String, require: false }],
    product: { type: Schema.Types.ObjectId, ref: SCHEMA_NAME.product, require: false },
    user: { type: Schema.Types.ObjectId, ref: SCHEMA_NAME.user, require: false },
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
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model(SCHEMA_NAME.review, schema);
