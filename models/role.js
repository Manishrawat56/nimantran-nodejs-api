const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SCHEMA_NAME =require("./schema-name")
const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true
    },
    roleDesc: {
      type: String,
      required: false
    },
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

module.exports = mongoose.model(SCHEMA_NAME.role, roleSchema);
