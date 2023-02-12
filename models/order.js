const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const schema = new Schema({
    txnId: { type: String, require: true },
    numberOfItem: { type: Number, require: false },
    taxValue: { type: Number, require: false },
    taxPercentage: { type: Number, require: false },
    paymentType: { type: String, require: false },
    user: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.user, require: false },
    address: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.address, require: false },
    deliveryDate: { type: Date, require: false },
    orderStatus: { type: String, require: false },
    invoiceUrl: { type: String, require: false },
    invoiceNumber: { type: String, require: false },
    payId: { type: String, require: false },
    gstNumber: { type: String, require: false },
    gatewayCharge: { type: Number, require: false },
    gatewayChargePercentage: { type: Number, require: false },
    disable: { type: Boolean, require: false },
    paymentStatus: { type: String, require: false },
    gatewayType: { type: String, require: false },
    totalMrp: { type: Number, require: false },
    totalSellingPrice: { type: Number, require: false },
    currency: { type: String, require: false },
    finalOrderAmount: { type: Number, require: false },
    paidAmount: { type: Number, require: false },
    discountAmount: { type: Number, require: false },
    discountCode: { type: String, require: false },
    paidAmount: { type: Number, require: false },
    pendingAmount: { type: Number, require: false },
    products:[{productName: { type: String, require: false },
      product: { type: Schema.Types.ObjectId,ref:SCHEMA_NAME.product, require: false },
      SKUNumber: { type: String, require: false },
      mrp: { type: Number, require: false },
      sellPrice: { type: Number, require: false },
      imageUrl: { type: String, require: false },
      quantity: { type: Number, default:1 },
      color: { type: String, require: false },
      size: { type: String, require: false },
      weight: { type: Number, require: false },
    }]
  
},{ timestamps: true });
schema.method("toJSON", function () {
  const { __v, _id,createdAt,updatedAt, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model(SCHEMA_NAME.order, schema);

