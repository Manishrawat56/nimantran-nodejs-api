const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const schema = new Schema({
    courierCompany: { type: String, require: true },
  trackingId: { type: String, require: false },
  trackingUrl: { type: String, require: false },
  status: { type: String, require: false },
  order: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.order, require: false },
  user: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
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
},{ timestamps: true });
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.orderTracking, schema);
