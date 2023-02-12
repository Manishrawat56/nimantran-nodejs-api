const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;
const SCHEMA_NAME = require("./schema-name");

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: { type: Boolean, required: false },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    dob: { type: Date, required: false },

    disabled: {
      type: Boolean,
      required: false,
    },
    accountExpired: {
      type: Boolean,
      required: false,
    },
    accountLocked: {
      type: Boolean,
      required: false,
    },
    credentialsExpired: {
      type: Boolean,
      required: false,
    },
    phoneNumber: { type: String, required: false },

    mobileVerified: {
      type: Boolean,
      required: false,
    },

    lastLoginTS: { type: Date, required: false },

    picUrl: { type: String, required: false },
    company: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.company,
    },
    loginCount: { type: Number, required: false },
    lostPasswordCount: { type: Number, required: false },
    failedLoginCount: { type: Number, required: false },

    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: SCHEMA_NAME.role,
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
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model(SCHEMA_NAME.user, schema);
